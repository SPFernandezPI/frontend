import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';

@Component({
  selector: 'app-product-favorites',
  standalone: true,
  imports: [CommonModule, CardModule, ToastModule, SpinnerComponent],
  templateUrl: './product-favorites.component.html',
  styleUrl: './product-favorites.component.scss',
  providers: [MessageService],
})
export class ProductFavoritesComponent implements OnInit {
  constructor(
    private favoriteService: FavoriteService,
    private messageService: MessageService
  ) {}

  public idUser: any;

  public favoritesProducts: any;
  public products: any[] = [];

  public isLoading: boolean = false;

  ngOnInit(): void {
    this.idUser = localStorage.getItem('user_id')!;
    this.getFavs(this.idUser!);
  }

  getFavs(idUser: any) {
    this.isLoading = true;
    this.favoriteService.getFavs(idUser).subscribe(
      (resp) => {
        this.favoritesProducts = resp.value;
        this.products = [];
        this.favoritesProducts.forEach((element: any) => {
          this.products.push({
            producto: element.producto,
            idFavorito: element.id_favorito,
          });
        });
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteFav(idProduct: any) {
    this.favoriteService.deleteFav(idProduct).subscribe((resp) => {
      this.getFavs(this.idUser);
      this.messageService.add({
        severity: 'error',
        summary: 'Eliminado de favoritos!',
        detail: 'REVISA TU LISTA',
      });
    });
  }
}
