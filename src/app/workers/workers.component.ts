import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css'],
})
export class WorkersComponent implements OnInit {
  list!: User[];
  searchText: string = '';
  constructor(private userService: UserService, private route: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((actionArray) => {
      this.list = actionArray.map((item) => {
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as User),
        };
      });
      
    });
    
  }

  filterCondition(user: User) {
    return (
      user.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1
    );
  }

  detailsWorker(uniqueId: string) {
    this.route.navigate(['worker/' + uniqueId]);
  }
}
