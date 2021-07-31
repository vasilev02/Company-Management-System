import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../shared/interfaces';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private fireAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    if (localStorage.getItem('user') != null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  async onLogin(email: string, password: string) {
    const user: IUser = { email, password };
    await this.authService.login(user);

    if (this.authService.isLoggedIn) {
      this.fireAuth.signInWithEmailAndPassword(email, password);
      this.isLoggedIn = true;
      localStorage.setItem('email', email);
      this.router.navigate(['/']);
      this.toastr.success('Logged successfully !', 'Login');
    }
  }
}
