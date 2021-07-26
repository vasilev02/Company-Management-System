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
  searchText : string = '';
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

  filterCondition(user: User){
    return user.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }

}
