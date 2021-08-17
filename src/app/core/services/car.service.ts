import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/widgets/models/user';
import { environment } from 'src/environments/environment';
import { Car } from '../widgets/models/car';

@Injectable({ providedIn: 'root' })

export class CarService {


  constructor(private http: HttpClient) {
  }

  public add(id: number, car: any): Observable<boolean> {
    console.log(car);
    return this.http.post<Car>(`${environment.baseUrl}/cars/car/${id}`, car).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

  public uploadPicture(name, file): Observable<string> {
    console.log(file);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('picture', file);
    return this.http.post<string>(`${environment.baseUrl}/cars/upload`, formData).pipe(
      catchError(err => {
        console.error(err);
        return of(null);
      })
    );
  }

  public confirmPicture(name, path): Observable<string> {

    return this.http.post<string>(`${environment.baseUrl}/cars/confirm`, { name: name, picturePath: path }).pipe(
      catchError(err => {
        console.error(err);
        return of(null);
      })
    );
  }

  public cancelPicture(path): Observable<string> {
    return this.http.post<string>(`${environment.baseUrl}/cars/cancel`, { picturePath: path }).pipe(
      catchError(err => {
        console.error(err);
        return of(null);
      })
    );
  }

}
