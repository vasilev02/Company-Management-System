import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../shared/user.model';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser!: User;
  list!: User[];

  form = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    position: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    salary: new FormControl('', [Validators.required, Validators.min(1)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private firestore: AngularFirestore) {}

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }
}
