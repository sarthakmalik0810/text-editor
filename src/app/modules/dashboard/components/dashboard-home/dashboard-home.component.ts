import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersFirebaseService } from '../../../../services/users-firebase.service';
import { UserDocumentsService } from '../../../../services/user-documents.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  userDocuments = [];
  teststr='vsdfvszdf'

  constructor(
    private router: Router,
    private usersFirebaseService: UsersFirebaseService,
    private userDocumentsService: UserDocumentsService
  ) { }

  loggedInUser;

  ngOnInit(): void {
    this.usersFirebaseService.user$.subscribe((res: any) => {
      this.loggedInUser = res;
      this.getUserDocuments();
    })
    
  }

  newDocument(){
    this.router.navigate(['/editor']);
  }

  getUserDocuments(){
    if(this.loggedInUser){
      this.userDocumentsService.getUserDocuments(this.loggedInUser.email).subscribe((res) => {
        res.docs.forEach((element) => {
          this.userDocuments.push({docId: element.id, ...element.data() as Object});
        });
      },
      err => console.log(err),)
    }
    console.log(this.userDocuments);
  }

  navigateToDocument(docId){
    this.router.navigate(['/editor'], {queryParams: {docId: docId}});
  }


    
}
