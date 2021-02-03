import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanLoad,
  Router,
  CanActivate,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { SnackbarService } from '../services/snackbar.service';
import { UsersFirebaseService } from '../services/users-firebase.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedinGuard implements CanLoad, CanActivate {
  constructor(
    private authService: UsersFirebaseService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  canLoad() {
    return this.authService.user$.pipe(
      take(1),
      map((user) => {
        if (user) {
          this.router.navigate(['/dashboard']);
          this.snackbar.open('You are already logged in');
          return false;
        }
        return true;
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.user$.pipe(
      take(1),
      map((user) => {
        if (user) {
          this.router.navigate(['/dashboard']);
          this.snackbar.open('You are already logged in');
          return false;
        }
        return true;
      })
    );
  }
}
