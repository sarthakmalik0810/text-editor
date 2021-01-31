import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { STORES } from '../constants/app-constants';
import { IUsers } from '../interfaces/i-users';

@Injectable({
  providedIn: 'root'
})
export class UsersFirebaseService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getUsers(){
    return this.firestore.collection(STORES.USERS).snapshotChanges();
  }

  findUser(userId){
    return this.firestore.collection(STORES.USERS, users => users.where('userName', "==", userId)).get()
  }

  addUser(userObj: IUsers){
    this.firestore.collection(STORES.USERS).add(userObj)
  }

  deleteUser(userID){
    this.firestore.collection(STORES.USERS).doc(userID).delete();
  }
}
