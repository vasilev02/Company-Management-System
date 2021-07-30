import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  formAddRole = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(3)]),
  });

  constructor(private firestore: AngularFirestore) { }

  addRole(roleData:any){
    this.firestore.collection('roles').doc().set({
      name: roleData.name
    })
  }

  getRoles(){
    return this.firestore.collection('roles').snapshotChanges();
  }

  deleteRoleById(uniqueId:any){
    this.firestore.doc('roles/' + uniqueId).delete();
  }

}
