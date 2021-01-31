import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorHomeComponent } from './components/editor-home/editor-home.component';

const routes: Routes = [
  { path: '', component: EditorHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
