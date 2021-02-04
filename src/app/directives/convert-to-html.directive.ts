import { Directive, ElementRef, Input, TemplateRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appConvertToHTML]'
})
export class ConvertToHTMLDirective implements OnInit{
  @Input() htmlString: string;
  
  constructor(private el: ElementRef) { 
   }

   ngOnInit(){
     this.el.nativeElement.style.wordWrap = 'break-word'
     this.el.nativeElement.style.position = 'relative'
    this.el.nativeElement.innerHTML = this.htmlString; 
    // this.el.nativeElement.style.overflow = 'hidden'
    // this.el.nativeElement.style.whiteSpace = 'normal'
    // this.el.nativeElement.style.textOverflow = 'ellipsis'
   }

}
