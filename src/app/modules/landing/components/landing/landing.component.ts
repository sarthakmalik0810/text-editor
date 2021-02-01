import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  sarthakURL = 'https://www.linkedin.com/in/sarthak-malik-b91725199/';
  mayankURL = 'https://www.linkedin.com/in/mayank-sethi-88879116b/';
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  openInNewWindow(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

  scrollToElement(element) {
    element.scrollIntoView({behavior: "smooth", block: "start", inline:"nearest"})
  }

  navigateToEditor(){
    this.router.navigate(['/editor'], {queryParams: {user: 'no_user'}});
  }

}
