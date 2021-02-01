import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorHomeComponent } from './components/editor-home/editor-home.component';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [EditorHomeComponent],
  imports: [
    CommonModule,
    EditorRoutingModule,
    MatToolbarModule
  ]
})
export class EditorModule { }
