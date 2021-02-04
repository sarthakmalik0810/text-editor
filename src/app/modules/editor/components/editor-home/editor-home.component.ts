import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UsersFirebaseService } from '../../../../services/users-firebase.service';
import { UserDocumentsService } from '../../../../services/user-documents.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-editor-home',
  templateUrl: './editor-home.component.html',
  styleUrls: ['./editor-home.component.css']
})
export class EditorHomeComponent implements OnInit, OnDestroy {

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
  fonts = [
    'Times New Roman',
    'Arial',
    'Comic Sans MS',
    'Courier',
    'Georgia',
    'Tahoma',
    'Verdana'
  ]

  fontSizes = [
    3, 4, 5, 8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96
  ]

  //buttons
  
  bold = true;
  italic = true;
  underline = true;
  strikeThrough = true;
  justifyLeft = true;
  justifyRight = true;
  justifyCenter = true;
  justifyFull = true;
  cut = true;
  paste = true;
  copy = true;
  indent = true;
  outdent = true;
  subscript = true;
  superscript = true;
  undo = true;
  redo = true;
  insertUnorderedList = true;
  insertOrderedList = true;
  insertParagraph = true;
  inSertHorizontalRule = true;

  takeFromLocalStorage = false;
  mode;
  subs: Subscription[] = [];
  saved = false;
  lastSaved;

 
  ngOnInit(): void {
    this.editorPane = document.getElementsByTagName('iframe')[0].contentDocument || document.getElementsByTagName('iframe')[0].contentWindow.document;
    this.editorPane.getElementsByTagName('body')[0].style.wordBreak = 'break-word';
    this.documentName = this.defaultDocumentName;
    const qp = this.ar.snapshot.queryParams;
      this.mode = qp.mode;
      this.usersFirebaseService.user$.subscribe((res: any) => {
        this.loggedInUser = res;
        if(this.mode === 'get_saved'){
          this.setFromLocalstorage()
        }
        else{
          this.ar.queryParams.subscribe((res: any) => {
            console.log(res);
            this.currentDocument = res.docId;
            this.userDocumentService.findDocument(res.docId).subscribe((res) => {
            this.editorPane.getElementsByTagName('body')[0].innerHTML = res.docs[0].data()['htmlString'];
            this.documentName = res.docs[0].data()['documentName'];
            this.lastSaved = res.docs[0].data()['uploadDate'];
          })
         
        })
        }
      })
    this.editorPane.designMode = 'on';
  }

  setFromLocalstorage(){
    if(localStorage.getItem('temp_user_html')){
      this.userDocumentService.addUserDocument({
        userId: this.loggedInUser.uid,
        emailId: this.loggedInUser.email,
        htmlString: JSON.parse(localStorage.getItem('temp_user_html')).htmlString,
        documentName: JSON.parse(localStorage.getItem('temp_user_html')).documentName,
        uploadDate:  JSON.parse(localStorage.getItem('temp_user_html')).uploadDate
      }).then(docRef => {
        this.editorPane.getElementsByTagName('body')[0].innerHTML = JSON.parse(localStorage.getItem('temp_user_html')).htmlString;
          this.documentName = JSON.parse(localStorage.getItem('temp_user_html')).documentName;
          this.lastSaved = JSON.parse(localStorage.getItem('temp_user_html')).uploadDate
        // this.router.navigate([], {relativeTo: this.ar, queryParams: {docId: docRef.id}, queryParamsHandling: 'merge', skipLocationChange: true})
        localStorage.removeItem('temp_user_html');
    })
    }
   
  }

  checkSaved(){
    let c;
    if(this.saved === false){
      c = confirm('Your changes are not saved, do you want to save it before navigating to dashboard??');
      if(c){
        this.userDocumentService.updateUserDocument(this.currentDocument, {htmlString: this.editorPane.getElementsByTagName('body')[0].innerHTML, documentName: this.documentName,
        uploadDate: new Date().toString()
      });
        this.snackbarService.openSnackbarWithStyle('Document updated successfully', 'green-snackbar');
      }
      else{
        this.router.navigate(['/dashboard'])
      }
    }
  }

  execCmd(command){
    this.editorPane.execCommand(command, false, null);
  }


  execCmdWithArgs(command, arg){
    this.editorPane.execCommand(command, false, arg);
  }
  
  addLink(){
      var url = prompt('Enter a URL:', 'http://');
      this.editorPane.execCommand('createLink', true, url);
      var selection = this.editorPane.getSelection();
      selection.anchorNode.parentElement.target = '_blank';
  }

  getDocumentName(docName){
    this.documentName = docName;
  }

  toggleSaved(r){
    console.log(r)
  }

  saveHTML(){
    if(this.loggedInUser){
      this.lastSaved = new Date().toString();
      this.saved = true;
      if(this.currentDocument){
        this.userDocumentService.updateUserDocument(this.currentDocument, {htmlString: this.editorPane.getElementsByTagName('body')[0].innerHTML, documentName: this.documentName,
        uploadDate: new Date().toString()
      });
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
            uploadDate: new Date().toString()
          }).then(docRef => {
            this.snackbarService.openSnackbarWithStyle('Document added successfully', 'green-snackbar');
            this.router.navigate([], {relativeTo: this.ar, queryParams: {docId: docRef.id}})
        })
        })
      }
        
    }
    else{
      const temp_user_data = {htmlString: this.editorPane.getElementsByTagName('body')[0].innerHTML, documentName: this.documentName, uploadDate: new Date().toString()}
      localStorage.setItem('temp_user_html', JSON.stringify(temp_user_data));
      this.takeFromLocalStorage = true;
      this.snackbarService.openSnackbarWithStyle('You are not loggen in!', 'red-snackbar');
      this.router.navigate(['/login'], {queryParams: {loggedIn: false}, skipLocationChange: true});
    }
  }

  deleteDoc(){
    
    this.userDocumentService.deleteUserDocument(this.currentDocument);
    this.snackbarService.openSnackbarWithStyle('Document deleted Successfully', 'red-snackbar');
    this.router.navigate(['/dashboard'])
  }
  
  ngOnDestroy(){
    this.subs.forEach(element => {
      if(element){
        element.unsubscribe();
      }
    });
  }
}
