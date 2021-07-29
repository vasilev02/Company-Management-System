import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
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
    private router: Router,
    private fireStore: AngularFirestore,
    public userService: UserService,
    private toastr: ToastrService
  ) {
    this.activatedRoute.params.subscribe((query) => {
      this.routeId = query.id;
    });
  }

  submitted!: boolean;
  formControls = this.userService.formUpdate.controls;

  ngOnInit(): void {
    this.fireStore
      .collection('users')
      .ref.doc(this.routeId)
      .get()
      .then((response) => {
        this.userData = response.data();
        this.populateUpdateForm(this.userData);
      });
  }

  populateUpdateForm(user: any) {
    this.userService.formUpdate.setValue(user);
  }

  onUpdate() {
    this.submitted = true;
    if (this.userService.formUpdate.valid) {
      if (confirm('Are you sure to edit this user !')) {
        let userData = this.userService.formUpdate.value;
        this.userService.updateUser(userData);
        this.submitted = false;
        this.router.navigate(['worker/' + userData.uniqueId]);
        this.toastr.success(
          userData.fullName + ' was successfully editted !',
          'User edit'
        );
      }
    }
  }
}
