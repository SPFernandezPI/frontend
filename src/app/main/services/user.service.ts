import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  //buscar interfaz  
  getInfoUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/Usuario/Usuarioxid/${id}`);
  }
}
