import { Component, Inject, OnInit } from '@angular/core';
import { UsersFirebaseService } from '../../../../services/users-firebase.service';
import { UserDocumentsService } from '../../../../services/user-documents.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';

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
    private router: Router,
    private snackbarService: SnackbarService
    
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
  
  addLink(){
      // var linkURL = ''
      // var sText = this.editorPane.getSelection();

      // this.editorPane.execCommand('insertHTML', false, '<a href="' + linkURL + '" target="_blank">' + sText + '</a>');
      var url = prompt('Enter a URL:', 'http://');
      this.editorPane.execCommand('createLink', true, url);
      var selection = this.editorPane.getSelection();
      selection.anchorNode.parentElement.target = '_blank';


  
  }
  toggleSource(){
    
  }

  getDocumentName(docName){
    this.documentName = docName
  }

  saveHTML(){
    if(this.loggedInUser){
      if(this.currentDocument){
        this.userDocumentService.updateUserDocument(this.currentDocument, this.editorPane.getElementsByTagName('body')[0].innerHTML);
        this.snackbarService.openSnackbarWithStyle('Document updated successfully', 'green-snackbar');
      }
      else{
        this.userDocumentService.findDocumentUsingDocName(this.documentName).subscribe((res: any) => {
          const docsWithSameName = [];
          res.docs.forEach(element => {
            docsWithSameName.push(element.data())
          });
          if(docsWithSameName.length){
            this.documentName = `${this.documentName}(${docsWithSameName.length + 1})`
          }
          this.userDocumentService.addUserDocument({
            userId: this.loggedInUser.uid,
            emailId: this.loggedInUser.email,
            htmlString: this.editorPane.getElementsByTagName('body')[0].innerHTML,
            documentName: this.documentName,
            uploadDate: new Date()
          }).then(docRef => {
            this.snackbarService.openSnackbarWithStyle('Document added successfully', 'green-snackbar');
            this.router.navigate([], {relativeTo: this.ar, queryParams: {docId: docRef.id}})
        })
        })
      
      }
        
    }
    else{
      this.snackbarService.openSnackbarWithStyle('You are not loggen in!', 'red-snackbar');
      this.router.navigate(['/login']);
    }
  }

  deleteDoc(){
    this.userDocumentService.deleteUserDocument(this.currentDocument);
    this.snackbarService.openSnackbarWithStyle('Document deleted Successfully', 'red-snackbar');
    this.router.navigate(['/dashboard'])
  }
}
