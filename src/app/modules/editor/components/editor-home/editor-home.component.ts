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

  menuItems= [
    {
      label: 'Sign Up',
      icon: 'login'
    },
    {
      label: 'About',
      icon: 'help'
    },
    {
      label: 'Pricing',
      icon: 'attach_money'
    },
    {
      label: 'Docs',
      icon: 'notes'
    },
    {
      label: 'Showcase',
      icon: 'slideshow'
    },
    {
      label: 'Blog',
      icon: 'rss_feed'
    },
  ];

 
  ngOnInit(): void {
    this.editorPane = document.getElementsByTagName('iframe')[0].contentDocument || document.getElementsByTagName('iframe')[0].contentWindow.document;
    this.ar.queryParams.subscribe((res: any) => {
      this.currentDocument = res.docId;
      this.userDocumentService.findDocument(this.currentDocument).subscribe((res) => {
        this.editorPane.getElementsByTagName('body')[0].innerHTML = res.docs[0].data()['htmlString'];
        this.documentName = res.docs[0].data()['documentName'];
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
          console.log(docsWithSameName);
          if(docsWithSameName.length){
            console.log('inside');

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
