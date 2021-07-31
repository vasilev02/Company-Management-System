import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  constructor(public roleService: RoleService , private toastr : ToastrService) {}

  list!: any[];
  submitted!: boolean;
  formControls = this.roleService.formAddRole.controls;

  ngOnInit(): void {
    this.getAllRoles();
  }

  onSubmit() {
    this.submitted = true;
    if (this.roleService.formAddRole.valid) {
      let roleData = this.roleService.formAddRole.value;
      this.roleService.addRole(roleData);
      this.submitted = false;
    }
  }

  getAllRoles() {
    this.roleService.getRoles().subscribe((actionArray) => {
      this.list = actionArray.map((item) => {
        return {
          uniqueId: item.payload.doc.id,
          ...(item.payload.doc.data() as any),
        };
      });
    });
  }

  deleteRole(uniqueId: any, roleName: any, roleCount: any) {
    if (Number(roleCount) > 0) {
      this.toastr.error("You have " + roleCount + " "+ roleName + " roles in use !")
    } else {
      if (confirm('Are you sure to delete this role !')) {
        this.roleService.deleteRoleById(uniqueId, roleName);
      }
    }
  }
}
