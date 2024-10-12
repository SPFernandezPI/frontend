import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { IdStorageService } from '../../../../shared/services/idService.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FavoriteService } from '../../../services/favorite.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, CardModule, TooltipModule, ToastModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  providers: [MessageService],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: any;
  public idUser?: number;

  public addToFav = {
    id_favorito: 0,
    id_Producto: 0,
    id_Usuario: 0,
  };

  constructor(
    private idStorageService: IdStorageService,
    private router: Router,
    private messageService: MessageService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.idUser = Number(localStorage.getItem('user_id')!);
  }

  goToDescription(id_Producto: number) {
    if (id_Producto) this.idStorageService.saveId(id_Producto);
    this.router.navigateByUrl('/main/product/details');
  }

  addFavorites(id_Favorite: number, id_Product: number, id_User: number) {
    this.addToFav.id_favorito = id_Favorite;
    this.addToFav.id_Producto = id_Product;
    this.addToFav.id_Usuario = id_User;
    this.favoriteService.favoriteProduct(this.addToFav).subscribe({
      next: (resp) => {
        this.messageService.add({
          severity: 'success',
          summary: '¡Agregado a favoritos!',
          detail: 'REVISA TU LISTA',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
