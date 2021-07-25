import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser } from '../shared/interfaces';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() isLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(public firebaseAuth: AngularFireAuth, public firestore: AngularFirestore) {}

  async login(user: IUser) {
    await this.firebaseAuth.signInWithEmailAndPassword(user.email, user.password)
    .then(response => {
      this.isLoggedIn.emit(true);
      localStorage.setItem('user', JSON.stringify(response.user));
    })
    .catch(error => {
      window.alert(error.message);
    })
  }

  async register(user: IUser) {
    await this.firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then(response => {
      
      this.isLoggedIn.emit(true);
      const user = JSON.stringify(response.user);
      localStorage.setItem('user', user);
    })
    .catch(error => {
      window.alert(error.message);
    })
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }

  getEmitter(){
    return this.isLoggedIn;
  }
}
