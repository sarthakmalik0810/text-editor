import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersFirebaseService } from '../../../../services/users-firebase.service';
import { UserDocumentsService } from '../../../../services/user-documents.service';
import * as _ from 'lodash';
import { SnackbarService } from '../../../../services/snackbar.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  userDocuments = [];

  constructor(
    private router: Router,
    private usersFirebaseService: UsersFirebaseService,
    private userDocumentsService: UserDocumentsService,
    public userService: UsersFirebaseService,
    private snackbarService: SnackbarService
  ) { }

  loggedInUser;

  ngOnInit(): void {
    this.userDocuments = [];
    this.usersFirebaseService.user$.subscribe((res: any) => {
      this.loggedInUser = res;
      this.getUserDocuments();
    })
  }

  newDocument(){
    this.router.navigate(['/editor']);
  }

  async logout() {
    let account = await this.userService.signOut();
    if(account.bool) {
      this.snackbarService.open('Logged out');
    }
  }

  getUserDocuments(){
    this.userDocuments = [];
    if(this.loggedInUser){
      this.userDocumentsService.getUserDocuments(this.loggedInUser.email).subscribe((res) => {
        res.docs.forEach((element) => {
          this.userDocuments.push({docId: element.id, ...element.data() as Object});
        });
        this.userDocuments = _.uniqBy(this.userDocuments, 'docId');
        this.userDocuments = _.sortBy(this.userDocuments, 'uploadDate')
        this.userDocuments= this.userDocuments.reverse();
      },
      err => console.log(err),)
    }
    console.log(this.userDocuments);
  }

  navigateToDocument(docId){
    this.router.navigate(['/editor'], {queryParams: {docId: docId}});
  }


    
}
