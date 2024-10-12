import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HandleErrorService } from '../../shared/services/handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private error: HandleErrorService) {}

  getRecommended(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/api/Producto/Recomended`)
      .pipe(catchError(this.error.handleError));
  }

  getInfoProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/Producto/ProductosxId/${id}`);
  }

  getValorateById(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/Producto/ObtenerPromedio/${id}`
    );
  }

  postValorate(idProduct: number, rating: number) {
    return this.http.post<any>(
      `${this.apiUrl}/api/Producto/valoracionProducto/${idProduct}`,
      rating
    );
  }

  filterProducts(
    nameProduct?: string | undefined | null,
    difficulty?: string | undefined | null,
    price?: number | undefined | null
  ): Observable<any> {
    let params = new HttpParams();

    if (nameProduct) {
      params = params.append('nombreproducto', nameProduct);
    }
    if (difficulty) {
      params = params.append('dificultad', difficulty);
    }
    if (price) {
      params = params.append('precio', price.toString());
    }

    return this.http.get<any>(`${this.apiUrl}/api/Producto/FiltrarProductos`, {
      params,
    });
  }
}
