import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../shared/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(public authService: AuthService, public router: Router) { }

  passCheck(passElement: HTMLInputElement) {
    if (passElement.type == 'password') {
      passElement.type = 'text';
    } else {
      passElement.type = 'password';
    }
  }

  async onLogin(email: string, password: string) {
    const user: IUser = {email, password}
    await this.authService.login(user);

    if (this.authService.isLoggedIn) {
      this.isLoggedIn = true;      
      this.router.navigate(['/about']);
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
