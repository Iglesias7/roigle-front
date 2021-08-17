import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-subTitle',
  templateUrl: './subTitle.component.html',
  styleUrls: ['./subTitle.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubTitleComponent implements OnInit {

  public currentTitle: string;
  public currentSubTitle: string;

  private readonly routesWithProductName = [
    '/habitants',
    '/compte',
    '/friends',
    '/friends-ask',
    '/friends-receive',
    '/immobilier',
    '/vehicule',
    '/single-post'
  ];
  private get needRoigleName(): boolean {
    return this
      .routesWithProductName
      .filter((route: string) => this.router.url.startsWith(route)).length > 0;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translator: TranslateService
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateRouteData(this.route.firstChild.snapshot.params));
  }

  updateRouteData(params: { [key: string]: string }) {
    this.currentSubTitle = null;
    this.currentTitle = this.getMainTitle(this.router.routerState, this.router.routerState.root);

    if (this.needRoigleName) {
        this.currentSubTitle = this.getSubtitleFromRoigleName(this.router.routerState, this.router.routerState.root);
    }
  }

  private getMainTitle(state, parent): string {
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      return this.translator.instant(parent.snapshot.data.title);
    }

    if (state && parent) {
      return (this.getMainTitle(state, state.firstChild(parent)));
    }
  }

  private getSubtitleFromRoigleName(state, parent): string {
    if (parent && parent.snapshot.data && parent.snapshot.data.title && parent.snapshot.data.ParentTitle) {
      return this.translator.instant(parent.snapshot.data.ParentTitle);
    }

    if (state && parent) {
      return (this.getSubtitleFromRoigleName(state, state.firstChild(parent)));
    }
  }

  goBack(){
    console.log(this.router.routerState);
    this.router.navigate([`${this.router.routerState.snapshot.url}`]);
  }


}
