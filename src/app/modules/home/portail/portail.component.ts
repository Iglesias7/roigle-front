import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-home-portail',
  templateUrl: './portail.component.html',
  styleUrls: ['./portail.component.scss']
})

export class PortailComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private loaderService: LoaderService) {

  }

  ngOnInit() {

  }
}
