import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.css'],
})
export class AboutUserComponent implements OnInit {
  routeId!: any;
  userData:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fireStore: AngularFirestore,
    private userService: UserService) {

    this.activatedRoute.params.subscribe(query => {
      this.routeId = query.id;
    })
      
    
  }

  ngOnInit(): void {
    
   this.fireStore.collection('users').ref.doc(this.routeId).get().then(response => {
     this.userData = response.data()
   })
    
  }
}
