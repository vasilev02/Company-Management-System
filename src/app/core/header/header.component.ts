import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(public authService: AuthService, public router: Router, private userService: UserService) {
    this.isLoggedIn = localStorage.getItem('user') ? true : false;
  }

  ngOnInit(): void {
    this.authService.getEmitter().subscribe((response) => {
      if (response) {
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    });
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
