import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
    public userService: UserService
  ) {}

  isLoggedIn: boolean = false;
  submitted!:boolean;
  formControls = this.userService.form.controls;

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  onSubmit(){
    this.submitted=true;
    if(this.userService.form.valid){
      let userData = this.userService.form.value;
      this.onRegister(userData);
      this.submitted=false;
    }
  }

  async onRegister(userInputs:any) {
    await this.authService.register(userInputs);
    if (this.authService.isLoggedIn) {
      this.isLoggedIn = true;
      this.router.navigate(['/']);
    }
  }
}
