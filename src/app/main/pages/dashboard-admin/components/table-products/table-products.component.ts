import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SpinnerComponent } from '../../../../../shared/spinner/spinner.component';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-table-products',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    SpinnerComponent,
    TableModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    DialogModule,
  ],
  templateUrl: './table-products.component.html',
  styleUrl: './table-products.component.scss',
})
export class TableProductsComponent implements OnInit {
  //Spinner
  public isLoading: boolean = false;
  //Array
  public products: any[] = [];
  //Search
  @ViewChild('dt2') dt2!: Table;
  public searchValue = '';
  //modales
  public visibleParticipants: boolean = false;
  public claseData: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  applyGlobalFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    if (this.dt2) {
      this.dt2.filterGlobal(inputValue, 'contains');
    }
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  getAllProducts() {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe(
      (resp) => {
        this.isLoading = false;
        this.products = resp.value;
      },
      (err) => {
        this.isLoading = false;
        this.products = [];
      }
    );
  }

  showDialogParticipants(id: number) {
    this.visibleParticipants = true;
    this.getInfoProduct(id)
  }

  getInfoProduct(id: number) {
    this.productService.getTeachersAndStudents(id).subscribe((resp) => {
      this.claseData = resp.value;
    });
  }
}
