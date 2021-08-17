import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

const activatedMenuItems = {
  'tableau-bord': ['home'],
  'commune': ['commune'],
  'achats-immobilier': ['achats'],
  'poker': ['choice'],
  'banque': ['banque'],
  'discothèque': ['discotheque'],
  'forum': ['forum']
};

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  currentUrl = '';

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (!(e instanceof NavigationEnd)) {
        return;
      }
      this.currentUrl = e.url.replace('/', '');
    });

  }

  get currentUser(){
    return this.auth.currentUser;
  }

  isActiveItemMenu(itemMenu: string): boolean {
    const routes = activatedMenuItems[itemMenu];
    return routes.filter(route => this.currentUrl.startsWith(route)).length > 0;
  }
}
