import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent implements OnInit {
  routeId!: any;
  userData: any = {
    fullName: '',
    email: '',
    salary: '',
    position: '',
    department: '',
    uniqueId: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private fireStore: AngularFirestore,
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
  }

  updateWorker(uniqueId: string) {
    this.route.navigate(['update-user/' + uniqueId]);
  }

  deleteUser(id: string) {
    if (confirm('Are you sure to delete this user !')) {
      // this.fireStore.doc('users/' + id).delete();
    }
  }
}
