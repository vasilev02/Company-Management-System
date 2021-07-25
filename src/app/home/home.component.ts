import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = localStorage.getItem('user') ? true : false;
  email: string | null = localStorage.getItem('user');
  constructor() {}

  ngOnInit(): void {
    
  }
}
