import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../services/role.service';
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
    role:'',
  };
  list!: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fireStore: AngularFirestore,
    public userService: UserService,
    private toastr: ToastrService,
    public roleService: RoleService
  ) {
    this.activatedRoute.params.subscribe((query) => {
      this.routeId = query.id;
    });
  }

  submitted!: boolean;
  formControls = this.userService.formUpdate.controls;
  roleSelected: any;

  ngOnInit(): void {
    this.fireStore
      .collection('users')
      .ref.doc(this.routeId)
      .get()
      .then((response) => {
        this.userData = response.data();
        this.populateUpdateForm(this.userData);
      });

    this.roleService.getRoles().subscribe((actionArray) => {
      this.list = actionArray.map((item) => {
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as any),
        };
      });
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

  onRoleSelected(selectedRole: any) {
    let roleId = '';
    let roleCount = '';

    let isFound = this.list.find((item) => {
      if (item.name === selectedRole) {
        roleId = item.id;
        roleCount = item.count;
        return item;
      }
    });

    if (selectedRole !== '' && isFound != undefined) {
      if (confirm("Are you sure to edit this user's role !")) {
        this.roleService.updateUserRole(
          selectedRole,
          roleId,
          Number(roleCount),
          this.routeId
        );

        this.roleService.updatePreviousRole(this.userData.role, this.list);

        this.router.navigate(['worker/' + this.routeId]);
        this.toastr.success(
          'Role was successfully changed to ' + selectedRole + ' !'
        );
      }
    }
  }
}
