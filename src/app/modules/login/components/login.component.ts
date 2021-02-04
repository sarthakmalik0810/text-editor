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
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';

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

  constructor(
    private usersFirebaseService: UsersFirebaseService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  async signInHandler() {
    if (this.login.invalid) {
      if (
        this.login.controls.email.errors?.required ||
        this.login.controls.email.invalid
      ) {
        this.snackbarService.open('Please enter valid email');
        return;
      } else if (this.login.controls.password.errors?.required) {
        this.openSnackBar('Please enter a Password');
        return;
      }
    }
    let email = this.login.get('email').value;
    let password = this.login.get('password').value;
    let res = await this.usersFirebaseService.signIn(email,password);
    if(res.bool) {
      this.router.navigate(['/dashboard']);
    }
    else {
      this.openSnackBar(res.error);
    }
  }

  async signUpHandler() {
    if (this.signUp.invalid) {
      if (
        this.signUp.controls.email.errors?.required ||
        this.signUp.controls.email.invalid
      ) {
        this.openSnackBar('Please enter valid Email');
        return;
      } else if (
        this.signUp.controls.password.errors?.required ||
        this.signUp.controls.confirmPassword.errors?.required ||
        this.signUp.controls.password.errors?.minLength
      ) {
        this.openSnackBar('Please enter valid password');
        return;
      } else if (
        this.signUp.get('password') !== this.signUp.get('confirmPassword')
      ) {
        this.openSnackBar("Passwords don't match");
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

  ngOnInit(): void {
    // this.usersFirebaseService.getUsers().subscribe((res: any) => {
    //   this.arr = res.map(item => {
    //     return {
    //       id: item.payload.doc.id,
    //       ...item.payload.doc.data()}
    //   })
    //   console.log(this.arr);
    // })
    this.initLoginForm();
    this.initSignUpForm();
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

  // addUser(userId, password) {
  //   const userObj: IUsers = {
  //     userName: userId,
  //     password: password,
  //   };
  //   console.log(userObj);
  //   this.usersFirebaseService.addUser(userObj);
  // }

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
        this.openSnackBar('Email already exists! Please Sign in!');
        return;
      } else {
        // this.addUser(email,password);
        this.usersFirebaseService.createUserAuth(email, password);
        this.openSnackBar('Successfully registered! Kindly login');
        this.signInForm = true;
        this.login.reset();
        this.signUp.reset();
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
