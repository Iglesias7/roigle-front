import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HommeComponent implements OnInit {
  mySlideImages = [
    '../../../../assets/js/svg/c1.svg',
    '../../../../assets/js/svg/c2.svg',
    '../../../../assets/js/svg/c3.svg'
  ];

  myCarouselImages = [
    'assets/js/svg/d1.svg',
    '../../../../assets/js/svg/d2.svg',
    '../../../../assets/js/svg/d3.svg'
  ];

  mySlideOptions = { items: 1, dots: true, nav: true };
  myCarouselOptions = { items: 3, dots: true, nav: true };

  constructor(
    private auth: AuthenticationService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {}
}
