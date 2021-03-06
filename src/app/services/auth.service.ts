import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser, IUserRegister } from '../shared/interfaces';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() isLoggedIn: EventEmitter<any> = new EventEmitter<any>();
  userInfo!: any;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  async login(user: IUser) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((response) => {
        this.isLoggedIn.emit(user.email);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.toastr.success('Logged successfully !', 'Login');

        this.userService.getUsers().subscribe((data) => {
          this.userInfo = data
            .find((currentUser) => {
              const userData: any = currentUser.payload.doc.data();
              return userData.email === user.email;
            })
            ?.payload.doc.data();
          localStorage.setItem('role', this.userInfo.role);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  async register(user: IUserRegister) {
    
    let id: string | undefined;

    let email = user.email;

    await this.firebaseAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((response) => {
        this.isLoggedIn.emit(true);
        const user = JSON.stringify(response.user);
        localStorage.setItem('user', user);
        localStorage.setItem('email', email);
        id = response.user!.uid;
      })
      .catch((error) => {
        window.alert(error.message);
      });

    this.fillData(id!, user);
  }

  fillData(id: string, user: IUserRegister) {
    this.firestore.collection('users').doc(id).set({
      uniqueId: id,
      fullName: user.fullName,
      email: user.email,
      position: user.position,
      department: user.department,
      salary: user.salary,
      role: 'PENDING',
      status: 'active',
    });
  }

  logout() {
    localStorage.clear();
    this.firebaseAuth.signOut();
  }

  getEmitter() {
    return this.isLoggedIn;
  }
}
