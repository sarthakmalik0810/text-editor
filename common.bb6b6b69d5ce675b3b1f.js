(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{ly3A:function(e,t,o){"use strict";o.d(t,"a",function(){return i});var r=o("em36"),n=o("fXoL"),c=o("I/3d");let i=(()=>{class e{constructor(e){this.firestore=e}getUserDocuments(e){return this.firestore.collection(r.a.DOCUMENTS,t=>t.where("emailId","==",e)).get()}addUserDocument(e){return this.firestore.collection(r.a.DOCUMENTS).add(e)}updateUserDocument(e,t){return this.firestore.collection(r.a.DOCUMENTS).doc(e).update(t)}deleteUserDocument(e){this.firestore.collection(r.a.DOCUMENTS).doc(e).delete()}findDocument(e){return this.firestore.collection(r.a.DOCUMENTS,t=>t.where("__name__","==",e)).get()}findDocumentUsingDocName(e){return this.firestore.collection(r.a.DOCUMENTS,t=>t.where("documentName","==",e)).get()}}return e.\u0275fac=function(t){return new(t||e)(n.Rb(c.a))},e.\u0275prov=n.Gb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);