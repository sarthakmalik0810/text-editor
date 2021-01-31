import { Component, OnInit } from '@angular/core';

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
