import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/widgets/models/user';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class CompteService {


  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:ban-types
  public acheter(data: any, id: number): Observable<Boolean> {
    // tslint:disable-next-line:ban-types
    return this.http.put<Boolean>(`${environment.baseUrl}/comptes/acheter/${id}`, data).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

}
