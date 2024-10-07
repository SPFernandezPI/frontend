import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {
    
  public handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrio un error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Estatus: ${error.status}, Mensaje: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
