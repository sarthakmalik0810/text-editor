import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedinGuard } from './guards/loggedin.guard';

const routes: Routes = [
  {
    path: 'landing',
    loadChildren: () =>
    import('./modules/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'login',
    canLoad:[LoggedinGuard],
    canActivate:[LoggedinGuard],
    loadChildren: () =>
    import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'dashboard',
    canLoad:[AuthGuard],
    canActivate: [AuthGuard],
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
