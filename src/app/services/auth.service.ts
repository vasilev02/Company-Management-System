import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;

  constructor(public firebaseAuth: AngularFireAuth) {}

  async login(user: IUser) {
    await this.firebaseAuth.signInWithEmailAndPassword(user.email, user.password)
    .then(response => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(response.user));
    })
    .catch(error => {
      window.alert(error.message);
    })
  }

  async register(user: IUser) {
    await this.firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then(response => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(response.user));
    })
    .catch(error => {
      window.alert(error.message);
    })
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }
}
