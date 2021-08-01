import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  formAddTask = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  constructor(
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  addTask(taskData: any, selectedRole: string) {
    if (confirm('Are you sure to add this task !')) {

      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);

      this.firestore.collection('tasks').doc().set({
        name: taskData.name,
        desription: taskData.description,
        role: selectedRole,
        date: today.toDateString(),
      });
      this.toastr.success('Successfully added ' + taskData.name + ' task !');
    }
  }
}
