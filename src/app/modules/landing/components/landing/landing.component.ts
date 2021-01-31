import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { IUsers } from 'src/app/interfaces/i-users';
import { UsersFirebaseService } from '../../../../services/users-firebase.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  sarthakURL = 'https://www.linkedin.com/in/sarthak-malik-b91725199/';
  mayankURL = 'https://www.linkedin.com/in/mayank-sethi-88879116b/';
  constructor() {}

  ngOnInit(): void {}

  openInNewWindow(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

  scrollToElement(element) {
    element.scrollIntoView({behavior: "smooth", block: "start", inline:"nearest"})
  }
}
