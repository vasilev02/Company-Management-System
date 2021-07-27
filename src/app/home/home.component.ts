import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

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
  isLoggedIn: boolean = localStorage.getItem('user') ? true : false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.userService.getUsers().subscribe((actionArray) => {
        actionArray.map((item) => {

          let currentUser:any  = item.payload.doc.data();

          if (currentUser['email'] === localStorage.getItem('email')) {
            this.userData = currentUser;
            this.router.navigate(['/']);
          }
        });
      });
    }
  }
}
