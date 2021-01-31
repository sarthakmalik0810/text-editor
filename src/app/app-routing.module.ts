import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'landing',
    loadChildren: () =>
    import('./modules/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'login',
    loadChildren: () =>
    import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
    import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'editor',
    loadChildren: () =>
    import('./modules/editor/editor.module').then(m => m.EditorModule),
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
