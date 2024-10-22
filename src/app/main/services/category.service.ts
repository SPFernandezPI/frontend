import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/Categoria/ListaCategoria`);
  }

  getInfoCategories(idCategories: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/Categoria/CategoriaporId?Idcategoria=${idCategories}`
    );
  }

  getProductsByCategories(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/Producto/FiltrarPorCategoria?categoriaId=${id}`
    );
  }

  filterProductsByCategory(
    idCategoria: number,
    nameProduct?: string | undefined | null,
    difficulty?: string | undefined | null,
    price?: number | undefined | null
  ): Observable<any> {
    let params = new HttpParams();

    if (idCategoria) {
      params = params.append('IdCategoria', idCategoria);
    }

    if (nameProduct) {
      params = params.append('nombreproducto', nameProduct);
    }
    if (difficulty) {
      params = params.append('dificultad', difficulty);
    }
    if (price) {
      params = params.append('precio', price.toString());
    }
    return this.http.get<any>(
      `${this.apiUrl}/api/Categoria/filtrarProductosPorCategoria`,
      {
        params,
      }
    );
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/api/Categoria/EliminarCategoria/${id}`
    );
  }

  newCateogy(information: {
    id_Categoria: number;
    nombre_Categoria: string;
    descripcion: string;
  }): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/Categoria/CrearCategoria`,
      information
    );
  }
}
