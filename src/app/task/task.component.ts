import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  constructor(
    public taskService: TaskService,
    private roleService: RoleService
  ) {}

  list!: any[];
  tasksList!: any[];
  selectedRole!: string;
  submitted!: boolean;
  formControls = this.taskService.formAddTask.controls;

  ngOnInit(): void {
    this.selectedRole = 'ALL';

    this.roleService.getRoles().subscribe((actionArray) => {
      this.list = actionArray.map((item) => {
        return {
          uniqueId: item.payload.doc.id,
          ...(item.payload.doc.data() as any),
        };
      });
    });

    this.taskService.getTasks().subscribe((actionArray) => {
      this.tasksList = actionArray.map((item) => {
        return {
          uniqueId: item.payload.doc.id,
          ...(item.payload.doc.data() as any),
        };
      });
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.taskService.formAddTask.valid) {
      let taskData = this.taskService.formAddTask.value;
      this.taskService.addTask(taskData, this.selectedRole);
      this.submitted = false;
    }
  }

  onRoleSelected(chosedRole: string) {
    let isFound = this.list.find((item) => {
      if (item.name === chosedRole) {
        return item;
      }
    });

    if (isFound != undefined) {
      this.selectedRole = chosedRole;
    } else {
      this.selectedRole = 'ALL';
    }
  }

  deleteTask(id:string, title:string){
    this.taskService.deleteTaskById(id, title);
  }
}
