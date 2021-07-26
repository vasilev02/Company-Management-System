import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { IUser, IUserRegister } from '../shared/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(public authService: AuthService, public router: Router) {}

  passCheck(passElement: HTMLInputElement) {
    if (passElement.type == 'password') {
      passElement.type = 'text';
    } else {
      passElement.type = 'password';
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  async onRegister(
    fullName: string,
    position: string,
    department: string,
    salary: string,
    email: string,
    password: string
  ) {
    const user: IUserRegister = { fullName, position, department, salary, email, password };
    await this.authService.register(user);

    if (this.authService.isLoggedIn) {
      this.isLoggedIn = true;
      this.router.navigate(['/']);
    }
  }
}
