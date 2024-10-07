import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
export class ProductCardComponent {
  @Input() product!: any;
  @Input() idUser?: number;

  public addToFav = {
    id_favorite: 0,
    id_Product: 0,
    id_User: 0,
  };

  constructor(
    private idStorageService: IdStorageService,
    private router: Router,
    private messageService: MessageService,
    private favoriteService: FavoriteService
  ) {}

  goToDescription(id_Producto: number) {
    if (id_Producto) this.idStorageService.saveId(id_Producto);
    this.router.navigateByUrl('/fithouse/in/products/view');
  }

  addFavorites(id_Favorite: number, id_Product: number, id_User: number) {
    this.addToFav.id_favorite = id_Favorite;
    this.addToFav.id_Product = id_Product;
    this.addToFav.id_User = id_User;
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
