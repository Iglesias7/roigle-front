import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/widgets/models/user';
import { environment } from 'src/environments/environment';
import { Immobilier } from '../widgets/models/immobilier';
import { MatDialog } from '@angular/material';
import { SignupComponent } from 'src/app/modules/home/auth/signup/signup.component';

@Injectable({ providedIn: 'root' })

export class ImmoService {


  constructor(private http: HttpClient,
    private dialog: MatDialog) {
  }

  public add(id: number, immo: any): Observable<boolean> {
    return this.http.post<Immobilier>(`${environment.baseUrl}/immobiliers/immobilier/${id}`, immo).pipe(
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
    return this.http.post<string>(`${environment.baseUrl}/immobiliers/upload`, formData).pipe(
      catchError(err => {
        console.error(err);
        return of(null);
      })
    );
  }

  public confirmPicture(name, path): Observable<string> {

    return this.http.post<string>(`${environment.baseUrl}/immobiliers/confirm`, { name: name, picturePath: path }).pipe(
      catchError(err => {
        console.error(err);
        return of(null);
      })
    );
  }

  public cancelPicture(path): Observable<string> {
    return this.http.post<string>(`${environment.baseUrl}/immobiliers/cancel`, { picturePath: path }).pipe(
      catchError(err => {
        console.error(err);
        return of(null);
      })
    );
  }

  public register(){
    this.dialog.open(SignupComponent, {height: "600px"});
  }

}
