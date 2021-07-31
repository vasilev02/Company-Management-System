import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  formAddRole = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  addRole(roleData: any) {
    if (confirm('Are you sure to add this role !')) {
      this.firestore.collection('roles').doc().set({
        name: roleData.name,
      });
      this.toastr.success('Successfully added ' + roleData.name + ' role !');
    }
  }

  getRoles() {
    return this.firestore.collection('roles').snapshotChanges();
  }

  deleteRoleById(uniqueId: any) {
    this.firestore.doc('roles/' + uniqueId).delete();
    this.toastr.success('Successfully removed role !');
  }

  updateUserRole(roleToUpdate: any, userId: any) {
    this.firestore
      .collection('users')
      .doc(userId)
      .update({ role: roleToUpdate });
  }
}
