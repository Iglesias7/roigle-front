import { Injectable, NgZone  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/widgets/models/user';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class SseService {


  constructor(private _zone: NgZone) {
  }

  getServerSentEvent(url: string): Observable<any> {
    return Observable.create(observer => {
      const eventSource = this.getEventSource(url);
      eventSource.onmessage = event => {
        this._zone.run(() => {
          observer.next(event);
        });
      };
      eventSource.onerror = error => {
        this._zone.run(() => {
          observer.error(error);
        });
      };
    });
  }

  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}
