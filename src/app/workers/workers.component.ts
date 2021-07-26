import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

  list!: User[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(actionArray =>{
      this.list = actionArray.map(item => {
        return { 
          id: item.payload.doc.id, 
          ...item.payload.doc.data() as User
        }
      })
    })
  }

}
