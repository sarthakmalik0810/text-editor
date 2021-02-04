import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { STORES } from '../constants/app-constants';
import { IUserDocuments } from '../interfaces/i-user-documents';

@Injectable({
  providedIn: 'root'
})
export class UserDocumentsService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  // getUserDocuments() {
  //   return this.firestore.collection(STORES.DOCUMENTS).snapshotChanges();
  // }


  getUserDocuments(emailId) {
    return this.firestore
      .collection(STORES.DOCUMENTS, (users) =>
        users.where('emailId', '==', emailId)
      )
      .get();
  }

  addUserDocument(userObj: IUserDocuments) {
   return this.firestore.collection(STORES.DOCUMENTS).add(userObj);
  }

  updateUserDocument(docId, obj){
    return this.firestore.collection(STORES.DOCUMENTS).doc(docId).update(obj);
  }

  deleteUserDocument(docId) {
    this.firestore.collection(STORES.DOCUMENTS).doc(docId).delete();
  }

  findDocument(docId){
    return this.firestore
    .collection(STORES.DOCUMENTS, docs => 
      docs.where('__name__', '==', docId)
    )
    .get()
    
  }

  findDocumentUsingDocName(docName){
    return this.firestore
    .collection(STORES.DOCUMENTS, docs => 
      docs.where('documentName', '==', docName)
    )
    .get()
  }

}
