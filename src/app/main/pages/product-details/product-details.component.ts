import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { IdStorageService } from '../../../shared/services/idService.service';
import { FavoriteService } from '../../services/favorite.service';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ImageModule,
    GalleriaModule,
    ToastModule,
    RatingModule,
    DialogModule,
    DividerModule,
    FormsModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  providers: [MessageService],
})
export class ProductDetailsComponent {
  //IMAGES
  images: any[] = [];
  displayBasic: boolean = false;
  responsiveOptions: any[] = [
    {
      breakpoint: '1500px',
      numVisible: 5,
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  //INFO PRODUCT
  product: any;
  // BUY AND RATING
  isBuy: boolean = false;
  visible: boolean = false;
  isStudent: boolean = false;
  rating: any = 0;
  ratingPost: any = 0;
  isValorated: boolean = false;
  //FAVORITES
  public addToFav = {
    id_favorito: 0,
    id_Producto: 0,
    id_Usuario: 0,
  };
  public idUser: any;

  constructor(
    private productService: ProductService,
    private favoriteService: FavoriteService,
    private idStorageService: IdStorageService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.isStudent = localStorage.getItem('userRole') === 'Alumno';
    this.idUser = localStorage.getItem('id')!;
    this.getInfoProduct();
    setTimeout(() => {
      this.images = [
        {
          src: this.product.imagenUrl,
        },
        {
          src: '../../../../assets/p2.png',
        },
        {
          src: '../../../../assets/p3.png',
        },
        {
          src: '../../../../assets/p4.png',
        },
        {
          src: '../../../../assets/p2.png',
        },
      ];
    }, 1500);
    this.getValorate();
  }

  getInfoProduct() {
    let idProduct = this.idStorageService.getId();
    if (idProduct == null) {
      this.router.navigateByUrl('/main/home');
    }
    this.productService.getInfoProductById(idProduct!).subscribe(
      (resp) => {
        this.product = resp.value;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getValorate() {
    let idProduct = this.idStorageService.getId();
    if (idProduct == null) {
      this.router.navigateByUrl('/main/home');
    }
    this.productService.getValorateById(idProduct!).subscribe(
      (resp) => {
        this.rating = (Math.round(resp.promedio * 100) / 100).toFixed(2);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  valorate() {
    this.visible = true;
  }

  postValorate(idProduct: number, valorate: number) {
    this.productService.postValorate(idProduct, valorate).subscribe((resp) => {
      this.isValorated = true;
    });
  }

  buy() {
    Swal.fire({
      title: '¿Desea comprar este curso?',
      text: 'Acepta los terminos y condiciones con la compra del curso.',
      showCancelButton: true,
      confirmButtonColor: '#09363b',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Comprar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Fithouse',
          text: '¡Gracias por su compra!',
          icon: 'success',
          confirmButtonColor: '#09363b',
        });
        this.isBuy = true;
      }
    });
  }

  displayBasicF() {
    this.displayBasic = !this.displayBasic;
  }

  addToFavorites(id_favorito: number, id_Producto: number, id_Usuario: number) {
    this.addToFav.id_favorito = id_favorito;
    this.addToFav.id_Producto = id_Producto;
    this.addToFav.id_Usuario = id_Usuario;
    this.favoriteService.favoriteProduct(this.addToFav).subscribe({
      next: (resp) => {
        this.messageService.add({
          severity: 'success',
          summary: '¡Agregado a favoritos!',
          detail: 'REVISA TU LISTA',
        });
      },
      error: (err) => {
        console.log('NOT OK');
      },
    });
  }
}
