import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  ],
  templateUrl: './out-home.component.html',
  styleUrl: './out-home.component.scss',
})
export class OutHomeComponent {
  //Search variables
  filterForm!: FormGroup;
  public price: number | undefined;
  public classSearch: string | undefined;
  selectedIntensity: string | null = null;
  optionsIntensity = [
    { label: 'Baja', value: 'baja' },
    { label: 'Media', value: 'media' },
    { label: 'Alta', value: 'alta' },
  ];

  filteredClasses: any[] = [];
  suggestions: any[] = [
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

  constructor(private productService: ProductService) {}

  onSearch(
    classSearch: string | undefined | null,
    selectedIntensity: string | undefined | null,
    price: number | undefined | null
  ): void {
    this.productService
      .filterProducts(classSearch, selectedIntensity, price)
      .subscribe({
        next: (response) => {
          console.log(response);
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
}
