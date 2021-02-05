import { Component, Inject, OnInit } from '@angular/core';
import { IUsers } from 'src/app/interfaces/i-users';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ValidatorFn,
} from '@angular/forms';
import { UsersFirebaseService } from 'src/app/services/users-firebase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserDocumentsService } from '../../../services/user-documents.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  foundUsers = [];
  arr: any = [];
  signInForm: boolean = true;
  signUp: FormGroup;
  login: FormGroup;

  loggedInStatus;

  constructor(
    private usersFirebaseService: UsersFirebaseService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router,
    private snackbarService: SnackbarService,
    private ar: ActivatedRoute,
    // private userDocumentService: UserDocumentsService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
    this.initSignUpForm();
    this.ar.queryParams.subscribe((res: any) => {
      this.loggedInStatus = res['loggedIn']
    })
  }

  async signInHandler() {
    if (this.login.invalid) {
      if (
        this.login.controls.email.errors?.required ||
        this.login.controls.email.invalid
      ) {
        this.snackbarService.openSnackbarWithStyle('Please enter valid email', 'red-snackbar');
        return;
      } else if (this.login.controls.password.errors?.required) {
        this.snackbarService.openSnackbarWithStyle('Please enter a Password', 'red-snackbar');
        return;
      }
    }
    let email = this.login.get('email').value;
    let password = this.login.get('password').value;
    let res = await this.usersFirebaseService.signIn(email,password);
    if(res.bool) {
      if(this.loggedInStatus == 'false'){
        this.router.navigate(['/editor'], {queryParams: {mode: 'get_saved'}, skipLocationChange: true});
      }
      else{
        this.router.navigate(['/dashboard']);
      }
    }
    else {
      this.snackbarService.openSnackbarWithStyle(res.error, 'red-snackbar');
    }
  }

  async signUpHandler() {
    if (this.signUp.invalid) {
      if (
        this.signUp.controls.email.errors?.required ||
        this.signUp.controls.email.invalid
      ) {
        this.snackbarService.openSnackbarWithStyle('Please enter valid Email', 'red-snackbar');
        return;
      } else if (
        this.signUp.controls.password.errors?.required ||
        this.signUp.controls.confirmPassword.errors?.required ||
        this.signUp.controls.password.errors?.minLength
      ) {
        this.snackbarService.openSnackbarWithStyle('Please enter valid password', 'red-snackbar');
        return;
      } else if (
        this.signUp.get('password') !== this.signUp.get('confirmPassword')
      ) {
        this.snackbarService.openSnackbarWithStyle("Passwords don't match", 'red-snackbar');
        return;
      }
    }
    this.foundUsers = [];
    let email = this.signUp.get('email').value;
    let password = this.signUp.get('password').value;
    this.validateUser(email, password);
  }

  toggleForm() {
    this.signInForm = !this.signInForm;
    this.login.reset();
    this.signUp.reset();
  }


  initLoginForm() {
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  initSignUpForm() {
    this.signUp = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.passwordCheck()]],
    });
  }

  passwordCheck(): ValidatorFn {
    return (control: FormControl) => {
      if (!control || !control.parent) {
        return null;
      }
      const newPassword = control.parent.get('password'); // The new password
      const confirmpassword = control.parent.get('confirmPassword'); // The retyped password

      if (!newPassword || !confirmpassword) {
        return null;
      }

      if (confirmpassword.value === '') {
        return null;
      }

      if (newPassword.value === confirmpassword.value) {
        return null;
      }

      return { mismatch: true };
    };
  }

  openSnackBar(message: string) {
    this.snackbar.open(message, 'X', { duration: 2000 });
  }

  deleteUser(id) {
    this.usersFirebaseService.deleteUser(id);
  }

  async findUser(email) {
    this.usersFirebaseService.findUser(email).subscribe((res) => {
      res.docs.forEach((element) => {
        this.foundUsers.push(element.data());
      });
    },
    err => console.log(err),)
  }

  validateUser(email,password) {
    this.usersFirebaseService.findUser(email).subscribe((res) => {
      res.docs.forEach((element) => {
        this.foundUsers.push(element.data());
      });
    },
    err => console.log(err),
    () => {
      if(this.foundUsers.length > 0) {
        this.snackbarService.openSnackbarWithStyle('Email already exists! Please Sign in!', 'red-snackbar');
        return;
      } else {
        this.usersFirebaseService.createUserAuth(email, password);
        this.snackbarService.openSnackbarWithStyle('Successfully registered! Kindly login', 'green-snackbar');
        this.signInForm = true;
        this.login.reset();
        this.signUp.reset();
        // this.router.navigate(['/dashboard']);
      }
    });
  }
}
