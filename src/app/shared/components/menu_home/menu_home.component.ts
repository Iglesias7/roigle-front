import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from '../../../core/widgets/models/user';

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu_home.component.html',
  styleUrls: ['./menu_home.component.css']
})

export class MenuHomeComponent {
    isExpanded = false;

    user: User;
    reputation:number;

    constructor(
      private router: Router,
      private auth: AuthenticationService
    ) {
      this.user = this.auth.currentUser;
      if(this.user)
        this.reputation = this.user.reputation;
     }

    collapse() {
      this.isExpanded = false;
    }

    get currentUser(){
      return this.auth.currentUser;
    }

    toggle() {
      this.isExpanded = !this.isExpanded;
    }

    logout(){
      this.auth.logout();
      this.router.navigate(['/login']);
    }
}
