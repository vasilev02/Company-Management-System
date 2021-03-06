import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  list!: any;

  formAddRole = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
  });

  constructor(
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  addRole(roleData: any) {
    if (confirm('Are you sure to add this role !')) {
      this.firestore.collection('roles').doc().set({
        name: roleData.name,
        count: 0,
      });
      this.toastr.success('Successfully added ' + roleData.name + ' role !');
    }
  }

  getRoles() {
    return this.firestore.collection('roles').snapshotChanges();
  }

  deleteRoleById(uniqueId: any, roleName: string) {
    this.firestore.doc('roles/' + uniqueId).delete();
    this.toastr.success('Successfully removed role !');
  }

  updateUserRole(roleToUpdate: any, roleId: any, roleCount: any, userId: any) {
    this.firestore
      .collection('users')
      .doc(userId)
      .update({ role: roleToUpdate });

    let role = this.firestore
      .collection('roles')
      .doc(roleId)
      .update({
        count: roleCount + 1,
      });
  }

  updatePreviousRole(roleToSearch: any, listRoles: any[]) {
    listRoles.find((current) => {
      if (current.name === roleToSearch) {
        this.firestore
          .collection('roles')
          .doc(current.id)
          .update({
            count: Number(current.count) - 1,
          });
      }
    });
  }

  
}
