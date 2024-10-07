import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HandleErrorService } from '../../shared/services/handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getFavs(idUser: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/Favorito/Listadeproductofavorito/${idUser}?idusuariologueado=${idUser}`
    );
  }

  favoriteProduct(information: {
    id_favorite: number;
    id_Product: number;
    id_User: number;
  }) {
    return this.http.post<any>(
      `${this.apiUrl}/api/Favorito/Productofavorito`,
      information
    );
  }

  deleteFav(deleteFav: any) {
    return this.http.delete<any>(
      `${this.apiUrl}/api/Favorito/RemoveProductofavorito/${deleteFav}`,
      deleteFav
    );
  }
}
