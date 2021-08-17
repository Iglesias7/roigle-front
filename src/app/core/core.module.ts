import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/auth.interceptor';
import { ServiceModule } from './services/service.module';
import { CoreRoutingModule } from './core.routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CoreRoutingModule,
    ServiceModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ]
})
export class CoreModule { }
