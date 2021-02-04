import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IUsers } from 'src/app/interfaces/i-users';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsersFirebaseService } from '../../../../services/users-firebase.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  sarthakURL = 'https://www.linkedin.com/in/sarthak-malik-b91725199/';
  mayankURL = 'https://www.linkedin.com/in/mayank-sethi-88879116b/';
  sarthakGit = 'https://github.com/sarthakmalik0810';
  mayankGit = 'https://github.com/mayanksethi97';
  user: IUsers;
  constructor(public userService: UsersFirebaseService, private snackbar: MatSnackBar, private router: Router, private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {}

  openInNewWindow(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

  scrollToElement(element) {
    element.scrollIntoView({behavior: "smooth", block: "start", inline:"nearest"})
  }

  async logout() {
    let account = await this.userService.signOut();
    if(account.bool) {
      this.snackbarService.openSnackbarWithStyle('Logged out!','red-snackbar');
    }
  }

  loginRoute() {
    this.router.navigate(['/login']);
  }
  
  openSnackBar(message: string) {
    this.snackbar.open(message, 'X', { duration: 2000 });
  }
}
