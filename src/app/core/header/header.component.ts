import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin!:boolean;
  userData: any = {
    uniqueId: '',
  };

  constructor(
    public authService: AuthService,
    public router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.isLoggedIn = localStorage.getItem('user') ? true : false;
  }

  ngOnInit(): void {
    this.authService.getEmitter().subscribe((response) => {
      if (response) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });

    const role = localStorage.getItem('role');
    if (role === 'ADMIN') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  myInfoDetails() {
    this.userService.getUsers().subscribe((actionArray) => {
      actionArray.map((item) => {
        let currentUser: any = item.payload.doc.data();

        if (currentUser['email'] === localStorage.getItem('email')) {
          this.userData = currentUser;
          this.router.navigate([
            'personal-information/' + this.userData.uniqueId,
          ]);
        }
      });
    });
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toastr.success('Logged out successfully !', 'Log out');
  }
}
