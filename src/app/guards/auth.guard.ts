import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
  CanActivate,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { SnackbarService } from '../services/snackbar.service';
import { UsersFirebaseService } from '../services/users-firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(
    private authService: UsersFirebaseService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  // canLoad():boolean {
  //   if(this.authService.isLoggedIn()){
  //     return true;
  //   }
  //   else {
  //     this.snackbar.open('Please login first!');
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }

  // canActivate(): boolean {
  //   if(this.authService.isLoggedIn()){
  //     return true;
  //   }
  //   else {
  //     this.snackbar.open('Please login first!');
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.user$.pipe(
      take(1),
      map((user) => {
        if (user) {
          return true;
        }
        this.snackbar.open('Please login to access dashboard');
        this.router.navigate(['/login']);
        return false;
      })
    );
  }

  canLoad() {
    return this.authService.user$.pipe(
      take(1),
      map((user) => {
        if (user) {
          return true;
        }
        this.snackbar.open('Please login to access dashboard');
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}

