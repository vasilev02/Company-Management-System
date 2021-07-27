import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../shared/interfaces';
import { AngularFirestore, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(public authService: AuthService, public router: Router, private userService: UserService) { }

  async onLogin(email: string, password: string) {
    const user: IUser = {email, password}
    await this.authService.login(user);

    if (this.authService.isLoggedIn) {
      this.isLoggedIn = true;
      localStorage.setItem('email',email)
      this.router.navigate(['/']);
    }

  }

  ngOnInit() {
    if (localStorage.getItem('user') != null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

}
