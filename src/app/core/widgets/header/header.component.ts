import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MatDialog, MatSidenav } from '@angular/material';
import { PopUpAuthComponent } from '../popUpAuth/popUpAuth.component';
import { Track } from 'ngx-audio-player';
import { Location } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  @Input() inputSideNav: MatSidenav;

  public showAppMenu = false;
  public showGoBack = true;

  get displayBackButton(): boolean {
    return this
      .routesWithBackButton
      .filter((route: string) => this.router.url.startsWith(route)).length > 0;
  }

  private readonly routesWithBackButton = [
    '/habitants',
    '/compte',
    '/friends',
    '/friends-ask',
    '/friends-receive',
    '/immobilier',
    '/vehicule',
    '/single-post'
  ];

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2,4,6];
  msaapDisplayVolumeControls = true;

  msaapPlaylist: Track[] = [
    // {
    //   title: 'Audio One Title',
    //   link: 'assets/audio2.mp3'
    // },
    // {
    //   title: 'Audio Two Title',
    //   link: 'assets/audio.mp3'
    // },
    // {
    //   title: 'Audio Three Title',
    //   link: 'assets/audio1.woff2'
    // },
  ];

    constructor(
      private router: Router,
      private auth: AuthenticationService,
      private dialog: MatDialog,
      private location: Location
    ) {

    }

    get currentUser(){
      return this.auth.currentUser;
    }

    authentication(){
      this.dialog.open(PopUpAuthComponent);
    }

    changeShowAppMenu(event): void {
      event.preventDefault();
      this.showAppMenu = !this.showAppMenu;
    }

    goBack(event): void {
      event.preventDefault();
      this.location.back();
    }
}
