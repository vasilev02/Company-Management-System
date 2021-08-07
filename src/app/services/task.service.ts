import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  formAddTask = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(30)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200)
    ]),
  });

  constructor(
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  getTasks() {
    return this.firestore.collection('tasks').snapshotChanges();
  }

  addTask(taskData: any, selectedRole: string) {
    if (confirm('Are you sure to add this task !')) {

      var now = Date.now().toString();
      const fromattedDate = formatDate(now, 'dd-MM-yyyy', 'en-IN').toString();
      let dateParts = fromattedDate.split('-');
      let newDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];

      this.firestore.collection('tasks').doc().set({
        title: taskData.name,
        desription: taskData.description,
        role: selectedRole,
        date: newDate,
      });
      this.toastr.success('Successfully added ' + taskData.name + ' task !');
    }
  }
}
