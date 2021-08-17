import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './modules/home/home.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { WidgetModule } from './core/widgets/widget.module';
import {MatSidenavModule} from '@angular/material';
import { JwtInterceptor } from './core/interceptors/auth.interceptor';
import { CommuneModule } from './modules/home/commune/commune.module';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CoreModule,
        HomeModule,
        SharedModule,
        WidgetModule,
        CommuneModule,
        MatSidenavModule
       ],
    entryComponents: [ ],
    providers: [
      {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true
      }
    ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
