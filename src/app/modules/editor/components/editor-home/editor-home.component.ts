import { Component, Inject, OnInit } from '@angular/core';
import { UsersFirebaseService } from '../../../../services/users-firebase.service';
import { UserDocumentsService } from '../../../../services/user-documents.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editor-home',
  templateUrl: './editor-home.component.html',
  styleUrls: ['./editor-home.component.css']
})
export class EditorHomeComponent implements OnInit {

  constructor(
    private usersFirebaseService: UsersFirebaseService,
    private userDocumentService: UserDocumentsService,
    private ar: ActivatedRoute,
    private router: Router
    
  ) {}

  loggedInUser;
  defaultDocumentName = 'Untitled Document';
  documentName;
  currentDocument;
  editorPane;

  ngOnInit(): void {
    this.editorPane = document.getElementsByTagName('iframe')[0].contentDocument || document.getElementsByTagName('iframe')[0].contentWindow.document;
    this.ar.queryParams.subscribe((res: any) => {
      this.currentDocument = res.docId;
      // this.userDocumentService.findDocument(this.currentDocument).subscribe((res: any)=> {
      //   console.log(res.docs)
      //   res.docs.forEach((element) => {
      //     console.log(element);
      //     this.editorPane.getElementsByTagName('body')[0].innerHTML = element.htmlString;
      //   });
      // },
      // err => console.log(err),)
      //   console.log(res);
      this.userDocumentService.findDocument(this.currentDocument).subscribe((res) => {
        this.editorPane.getElementsByTagName('body')[0].innerHTML = res.docs[0].data()['htmlString'];
      })
      })
    this.documentName = this.defaultDocumentName;
    this.usersFirebaseService.user$.subscribe((res: any) => {
      this.loggedInUser = res;
    })
    this.editorPane.designMode = 'on';
  }



  execCmd(command){
    this.editorPane.execCommand(command, false, null);
  }

  openExistingHTML(){

  }

  execCmdWithArgs(command, arg){
    this.editorPane.execCommand(command, false, arg);
  }

  toggleSource(){
    
  }

  getDocumentName(docName){
    this.documentName = docName
  }

  saveHTML(){
    if(this.loggedInUser){
      if(this.currentDocument){
        this.userDocumentService.updateUserDocument(this.currentDocument, this.editorPane.getElementsByTagName('body')[0].innerHTML)
      }
      else{
        
      this.userDocumentService.addUserDocument({
        userId: this.loggedInUser.uid,
        emailId: this.loggedInUser.email,
        htmlString: this.editorPane.getElementsByTagName('body')[0].innerHTML,
        documentName: this.documentName  
      }).then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        this.router.navigate([], {relativeTo: this.ar, queryParams: {docId: docRef.id}})
    })
      }
        
    }
  }

  deleteDoc(){
    this.userDocumentService.deleteUserDocument(this.currentDocument);
  }
}
