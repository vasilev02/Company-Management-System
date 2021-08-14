import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private route: Router,
    private firebaseAuth: AngularFireAuth,
    private toastr: ToastrService
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

  changePassword(email: string) {
    this.firebaseAuth.sendPasswordResetEmail(email);
    this.toastr.success('Check you email !');
  }

}
