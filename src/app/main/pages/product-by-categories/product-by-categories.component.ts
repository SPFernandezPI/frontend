import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { ToastModule } from 'primeng/toast';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { Router } from '@angular/router';
import { IdStorageService } from '../../../shared/services/idService.service';
import { IdCategoryService } from '../../../shared/services/idCategory.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-by-categories',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
  templateUrl: './product-by-categories.component.html',
  styleUrl: './product-by-categories.component.scss',
})
export class ProductByCategoriesComponent implements OnInit {
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
    { name: 'Yoga' },
    { name: 'Musculación' },
    { name: 'Pilates Avanzado' },
    { name: 'Cardio Funcional' },
    { name: 'Musculación Express' },
    { name: 'Gimnasia Acrobática' },
    { name: 'Gimnasia' },
    { name: 'Cardio' },
  ];
  //Products
  public products: any[] = [];
  public notProducts: boolean = false;
  //Info Categories
  public idCategorias!: number | null;
  public infoCategories?: any;

  constructor(
    private router: Router,
    private idStorageService: IdStorageService,
    private categorytService: CategoryService,
    private fb: FormBuilder,
    private idCategory: IdCategoryService
  ) {
    this.filterForm = this.fb.group({
      classSearch: [''],
      price: [''],
      selectedIntensity: [''],
    });
  }

  ngOnInit(): void {
    this.idCategorias = this.idCategory.getId();
    if (this.idCategorias === null) {
      this.router.navigate(['/main/home']);
    }
    this.getInfoByCategories(this.idCategorias!);
    this.getByCategories(this.idCategorias!);
  }

  onSearch(
    idCategoria: number,
    classSearch: string | undefined | null,
    selectedIntensity: string | undefined | null,
    price: number | undefined | null
  ): void {
    this.categorytService
      .filterProductsByCategory(
        idCategoria,
        classSearch,
        selectedIntensity,
        price
      )
      .subscribe({
        next: (response) => {
          this.products = response.value;
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
    this.getByCategories(this.idCategorias!);
    this.notProducts = false;
    this.filterForm.reset();
  }

  back() {
    this.router.navigate(['/main/home']);
  }

  getByCategories(idCategories: number) {
    this.categorytService.getProductsByCategories(idCategories!).subscribe(
      (resp) => {
        this.products = resp.value;
        this.notProducts = false;
        if (resp.value == null || []) {
          this.notProducts = true;
        }
      },
      (err) => {
        this.products = [];
        this.notProducts = true;
      }
    );
  }

  getInfoByCategories(idCategories: number) {
    this.categorytService.getInfoCategories(idCategories).subscribe((resp) => {
      this.infoCategories = resp.value;
    });
  }

  getImageByCategory(categoryName: string): string {
    switch (categoryName.toLowerCase()) {
      case 'pilates':
        return '../../../../assets/pilatesC.svg';
      case 'musculacion':
        return '../../../../assets/musculacionC.svg';
      case 'yoga':
        return '../../../../assets/yogaC.svg';
      case 'funcional':
        return '../../../../assets/funcionalC.svg';
      case 'cardio':
        return '../../../../assets/cardioC.svg';
      case 'gimnasia':
        return '../../../../assets/gimnasiaC.svg';
      default:
        return '';
    }
  }
}
