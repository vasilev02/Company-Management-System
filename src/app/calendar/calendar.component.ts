import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { TaskService } from '../services/task.service';
import { ITask } from '../shared/interfaces';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  list!: ITask[];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: '',

  }
  constructor(public taskService : TaskService) { }

  ngOnInit(): void {

    this.taskService.getTasks().subscribe((actionArray) => {
      this.list = actionArray.map((item) => {
        return {
          ...(item.payload.doc.data() as ITask),
        };
      });
      this.calendarOptions.events = this.list
    });

  }

}
