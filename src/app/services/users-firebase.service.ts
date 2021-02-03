import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { STORES } from '../constants/app-constants';
import { IUsers } from '../interfaces/i-users';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersFirebaseService {
  user$: Observable<IUsers>;
  constructor(
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth
  ) {
    this.user$ = this.fireauth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore.doc<IUsers>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getUsers() {
    return this.firestore.collection(STORES.USERS).snapshotChanges();
  }

  async createUserAuth(email, password) {
    const credential = await this.fireauth.createUserWithEmailAndPassword(email,password);
    return this.addUserData(credential.user);
  }

  async addUserData(user) {
    const userRef: AngularFirestoreDocument<IUsers> = this.firestore.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email
    }

    return userRef.set(data, {merge: true});
  }

  async signIn(email, password) {
    let accountErrorMessage = {
      bool: false,
      error: ''
    };
    await this.fireauth.signInWithEmailAndPassword(email,password).then(() => {
      accountErrorMessage.bool = true;
      return accountErrorMessage;
    }).catch((error => {
      accountErrorMessage.bool = false;
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/wrong-password":
        case "auth/user-not-found":
        {
           accountErrorMessage.error = "Wrong email address or password.";
           break;
        }
           default:
        {
            accountErrorMessage.error = "Unexpected Error";
            break;
        }
    }}))
    return accountErrorMessage;
  }

  async signOut() {
    let accountErrorMessage = {
      bool: false,
      error: ''
    }
    await this.fireauth.signOut().then(() => {
      accountErrorMessage.bool = true;
      return accountErrorMessage;
    }).catch((error) => {
      accountErrorMessage.error = 'Something went wrong';
    })
    return accountErrorMessage;
  }

  findUser(userId) {
    return this.firestore
      .collection(STORES.USERS, (users) =>
        users.where('userName', '==', userId)
      )
      .get();
  }

  addUser(userObj: IUsers) {
    this.firestore.collection(STORES.USERS).add(userObj);
  }

  deleteUser(userID) {
    this.firestore.collection(STORES.USERS).doc(userID).delete();
  }
}
