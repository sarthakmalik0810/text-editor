import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsersFirebaseService } from 'src/app/services/users-firebase.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-four-o-four',
  templateUrl: './four-o-four.component.html',
  styleUrls: ['./four-o-four.component.css'],
})
export class FourOFourComponent implements OnInit {
  constructor(
    public userService: UsersFirebaseService,
    private snackbar: SnackbarService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }

  async logout() {
    let account = await this.userService.signOut();
    if (account.bool) {
      this.snackbar.open('Logged Out');
      this.router.navigate(['/landing']);
    }
  }
}
