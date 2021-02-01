import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor-home',
  templateUrl: './editor-home.component.html',
  styleUrls: ['./editor-home.component.css']
})
export class EditorHomeComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    var iframes = document.getElementsByTagName('iframe');
    for (var i = 0, len = iframes.length, doc; i < len; ++i) {
      doc = iframes[i].contentDocument || iframes[i].contentWindow.document;
      doc.designMode = 'on';
    }
  }

  execCmd(command){
    var iframes = document.getElementsByTagName('iframe');
    for (var i = 0, len = iframes.length, doc; i < len; ++i) {
      doc = iframes[i].contentDocument || iframes[i].contentWindow.document;
      doc.execCommand(command, false, null);
    }
  }

  execCmdWithArgs(command, arg){
    console.log(arg);
    var iframes = document.getElementsByTagName('iframe');
    for (var i = 0, len = iframes.length, doc; i < len; ++i) {
      doc = iframes[i].contentDocument || iframes[i].contentWindow.document;
      doc.execCommand(command, false, arg);
    }
  }

  toggleSource(){
    
  }
}
