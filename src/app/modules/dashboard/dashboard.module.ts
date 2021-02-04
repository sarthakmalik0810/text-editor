import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card'
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConvertToHTMLDirective } from '../../directives/convert-to-html.directive';


@NgModule({
  declarations: [DashboardHomeComponent,
    ConvertToHTMLDirective],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    MatToolbarModule
  ]
})
export class DashboardModule { }
