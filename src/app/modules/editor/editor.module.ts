import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorHomeComponent } from './components/editor-home/editor-home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [EditorHomeComponent],
  imports: [
    CommonModule,
    EditorRoutingModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    FlexLayoutModule
  ]
})
export class EditorModule { }
