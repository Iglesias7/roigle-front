import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      request = request.clone({
          setHeaders: {
              Accept: 'application/json',
              Authorization: `Bearer ${(this.authService.hasToken()) ? this.authService.getToken() : ''}`
          }
      });
      return next.handle(request);
  }
  get authService(): AuthenticationService {
      return this.injector.get(AuthenticationService);
  }
}
