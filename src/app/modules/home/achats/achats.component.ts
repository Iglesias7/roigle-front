import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-achats',
  templateUrl: './achats.component.html',
  styleUrls: ['./achats.component.scss']
})
export class AchatsComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
  }
}
