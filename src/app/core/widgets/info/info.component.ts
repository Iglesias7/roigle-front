import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private router: Router) {

  }

  items = [
    {value: 1, disabled: false},
    {value: 2, disabled: false},
    {value: 3, disabled: false},
    {value: 4, disabled: false},
    {value: 5, disabled: false},
    {value: 6, disabled: false}
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  ngOnInit() {
  }

  get currentUser(){
    return this.auth.currentUser;
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['']);
  }
}
