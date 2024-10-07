import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { HandleErrorService } from '../../shared/services/handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}`; 
  
  constructor(private http: HttpClient, ) {}

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

}