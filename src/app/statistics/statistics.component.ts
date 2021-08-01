import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts'; 
import { ChartType, Row } from "angular-google-charts"
import { RoleService } from '../services/role.service';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  listRoles:any;
  listUsers:any;
  listTasks:any;

  type = ChartType.Gauge
  myOptions = {
    width: 400, height: 120,
    redFrom: 90, redTo: 100,
    yellowFrom:75, yellowTo: 90,
    minorTicks: 5
  };


  constructor(private roleService: RoleService, private userService: UserService , private taskService: TaskService) { }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe((actionArray) => {
      this.listRoles = (actionArray.map((item) => {
        return {
          id: item.payload.doc.id
        };
      })).length;
    });

    this.userService.getUsers().subscribe((actionArray) => {
      this.listUsers = (actionArray.map((item) => {
        return {
          id: item.payload.doc.id
        };
      })).length;
    });

    this.taskService.getTasks().subscribe((actionArray) => {
      this.listTasks = (actionArray.map((item) => {
        return {
          id: item.payload.doc.id
        };
      })).length;
    });
  }

}
