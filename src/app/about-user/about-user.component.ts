import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.css'],
})
export class AboutUserComponent implements OnInit {
  isAdmin!:boolean;
  routeId!: any;
  userData: any = {
    fullName: '',
    email: '',
    salary: '',
    position: '',
    department: '',
    uniqueId: '',
    status: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private fireStore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private userService: UserService,
    private authService: AuthService,
    private route: Router
  ) {
    this.activatedRoute.params.subscribe((query) => {
      this.routeId = query.id;
    });
  }

  ngOnInit(): void {
    this.fireStore
      .collection('users')
      .ref.doc(this.routeId)
      .get()
      .then((response) => {
        this.userData = response.data();
      });

      const role = localStorage.getItem('role');
      if(role === 'ADMIN'){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
  }

  updateWorker(uniqueId: string) {
    this.route.navigate(['update-user/' + uniqueId]);
  }

  deactivateUser(id: string) {
    if (confirm('Are you sure to delete this user ?')) {
      this.userService.changeStatus(id);
      this.route.navigate(['workers']);
    }
  }

  activateUser(id: string) {
    if (confirm('Are you sure to activate this user ?')) {
      this.userService.changeStatusActivate(id);
      this.route.navigate(['workers']);
    }
  }
}
