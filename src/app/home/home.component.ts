import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userData={
    fullName:'',
    uniqueId:''
  }

  optionsLaptopWorking: AnimationOptions = {
    path: '../assets/laptop-working.json'
  }

  optionsProgrammerLottie: AnimationOptions = {
    path: '../assets/programmer.json'
  }

  optionsConnectionsLottie: AnimationOptions = {
    path: '../assets/connections.json'
  }

  isLoggedIn: boolean = localStorage.getItem('user') ? true : false;

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.userService.getUsers().subscribe((actionArray) => {
        actionArray.map((item) => {

          let currentUser:any  = item.payload.doc.data();

          if (currentUser['email'] === localStorage.getItem('email')) {
            this.userData = currentUser;
            // this.router.navigate(['/']);
          }
        });
      });
    }
  }
}
