import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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
    id_favorito: number;
    id_Producto: number;
    id_Usuario: number;
  }): Observable<any> {
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
