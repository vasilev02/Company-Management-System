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
  routeId!: any;
  userData: any = {
    fullName: '',
    email: '',
    salary: '',
    position: '',
    department: '',
    uniqueId: '',
  };
  loggedUserEmail:string | null = '';

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
        this.loggedUserEmail = localStorage.getItem('email')
      });
  }

  updateWorker(uniqueId: string) {
    this.route.navigate(['update-user/' + uniqueId]);
  }

  deleteUser(id: string) {
    if (confirm('Are you sure to delete this user !')) {
      this.authService.logout();
      this.fireStore.doc('users/' + id).delete();
    }
  }
}
