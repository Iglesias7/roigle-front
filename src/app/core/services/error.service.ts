import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import * as HttpStatus from 'http-status-codes';

@Injectable()
export class ErrorService {
  constructor() {}

  handleErrorFromAPI(error: HttpErrorResponse): void {
    // todo: gestion par type d'erreur retournée, ce serait cool, ou pas :D
    switch (error.status) {
      case 0: // server not respond
        break;
      case HttpStatus.UNAUTHORIZED:
        break;
      case HttpStatus.CONFLICT:
        break;
      case HttpStatus.BAD_REQUEST:
        break;
      default:
        if (error.status >= 500) {
          // ...
        }
    }
  }
}
