import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackbar: MatSnackBar) { }

  public open(message: string) {
    this.snackbar.open(message, 'X', { duration: 2000 })
  }
}
