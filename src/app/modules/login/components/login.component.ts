import { Component, OnInit } from '@angular/core';
import { IUsers } from 'src/app/interfaces/i-users';
import { UsersFirebaseService } from 'src/app/services/users-firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  foundUSers = []
  arr: any = []
  constructor(
    private usersFirebaseService: UsersFirebaseService
    ) {
  }

  

  ngOnInit(): void {
    this.usersFirebaseService.getUsers().subscribe((res: any) => {
      this.arr = res.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()}
      })
      console.log(this.arr);
    })

  }

  addUser(userId, password){
    const userObj: IUsers = {
      userName: userId,
      password: password
    }
    console.log(userObj)
    this.usersFirebaseService.addUser(userObj);
  }

  deleteUser(id){
    this.usersFirebaseService.deleteUser(id);
  }

  findUser(user){
    this.usersFirebaseService.findUser(user).subscribe(res => {
      res.docs.forEach(element => {
        this.foundUSers.push(element.data());
      });
    })
  }
  

}
