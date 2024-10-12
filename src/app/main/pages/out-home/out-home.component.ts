import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { IdStorageService } from '../../../shared/services/idService.service';
import { IdCategoryService } from '../../../shared/services/idCategory.service';
import { delay, finalize } from 'rxjs';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { FavoriteService } from '../../services/favorite.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProductCardComponent } from '../components/product-card/product-card.component';

@Component({
  selector: 'app-out-home',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule,
    SpinnerComponent,
    ToastModule,
    ProductCardComponent,
  ],
  templateUrl: './out-home.component.html',
  styleUrl: './out-home.component.scss',
  providers: [MessageService],
})
export class OutHomeComponent implements OnInit {
  //Spiner
  public isLoading: boolean = true;
  //Search variables
  filterForm!: FormGroup;
  public price: number | undefined;
  public classSearch: string | undefined;
  public selectedIntensity: string | null = null;
  public optionsIntensity = [
    { label: 'Baja', value: 'baja' },
    { label: 'Media', value: 'media' },
    { label: 'Alta', value: 'alta' },
  ];
  public filteredClasses: any[] = [];
  public suggestions: any[] = [
    { name: 'Yoga para Principiantes' },
    { name: 'Pilates Avanzado' },
    { name: 'Cardio Funcional' },
    { name: 'Musculación Express' },
    { name: 'Gimnasia Acrobática' },
  ];
  //GetProducts
  public recomendedProduct: any[] = [];
  public filterProducts: any[] = [];
  public notProducts?: boolean;
  //Get Categories
  public categories: any[] = [];
  //Add favorites
  public idUser: any;
  public addToFav = {
    id_favorite: 0,
    id_Product: 0,
    id_User: 0,
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private favoriteService: FavoriteService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private idService: IdStorageService,
    private idCategory: IdCategoryService
  ) {
    this.filterForm = this.fb.group({
      classSearch: [''],
      price: [''],
      selectedIntensity: [''],
    });
  }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('user_id')!;
    this.getCategories();
    this.getRecomendedClass();
  }

  onSearch(
    classSearch: string | undefined | null,
    selectedIntensity: string | undefined | null,
    price: number | undefined | null
  ): void {
    this.productService
      .filterProducts(classSearch, selectedIntensity, price)
      .subscribe({
        next: (response) => {
          this.filterProducts = response.value;
          this.notProducts = false;
          if (response.value == null) {
            this.notProducts = true;
          }
        },
        error: (error) => {
          console.error('Error al filtrar productos:', error);
        },
      });
  }

  filterClasses(event: any) {
    const query = event.query;
    this.filteredClasses = this.suggestions.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  clearFilters() {
    this.price = undefined;
    this.classSearch = undefined;
    this.selectedIntensity = null;
    this.filterProducts = [];
    this.notProducts = false;
    this.filterForm.reset();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((resp) => {
      this.categories = resp.value;
    });
  }

  goToCategorie(id: number | undefined) {
    if (id) this.idCategory.saveId(id);
    this.router.navigateByUrl('main/product/byCategories');
  }

  getRecomendedClass() {
    this.productService
      .getRecommended()
      .pipe(
        delay(1000),
        finalize(() => this.toggleLoading())
      )
      .subscribe({
        next: (recomendedProduct) => {
          this.recomendedProduct = recomendedProduct.value;
        },
        error: (err) => console.log(err),
      });
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }
}
