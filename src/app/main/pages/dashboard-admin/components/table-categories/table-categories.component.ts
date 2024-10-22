import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SpinnerComponent } from '../../../../../shared/spinner/spinner.component';
import { ToastModule } from 'primeng/toast';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { CategoryService } from '../../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-categories',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    SpinnerComponent,
    ToastModule,
    TableModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    DialogModule,
  ],
  templateUrl: './table-categories.component.html',
  styleUrl: './table-categories.component.scss',
  providers: [MessageService],
})
export class TableCategoriesComponent implements OnInit {
  //Spinner
  public isLoading: boolean = false;
  //Array
  public categories: any[] = [];
  //Search
  @ViewChild('dt2') dt2!: Table;
  public searchValue = '';
  //New cateogory modal
  public newCategory: FormGroup;
  public visibleAdd: boolean = false;

  constructor(
    private categoriesService: CategoryService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.newCategory = this.fb.group({
      id_Categoria: [0],
      nombre_Categoria: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
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

  getAllCategories() {
    this.categoriesService.getCategories().subscribe((resp) => {
      this.categories = resp.value;
    });
  }

  deleteCategory(idCategory: number) {
    Swal.fire({
      title: '¿Seguro que quiere eliminar a este usuario?',
      text: 'Las clases asignadas perderan la categoria',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#09363b',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriesService.deleteCategory(idCategory).subscribe(
          (resp) => {
            Swal.fire({
              title: 'Eliminado',
              text: 'La categoria fue eliminada con exito',
              icon: 'success',
              confirmButtonColor: '#09363b',
            });
            this.getAllCategories();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  showDialogAdd() {
    this.visibleAdd = true;
  }

  newCategoria() {
    this.isLoading = true;
    let credentials = {
      id_Categoria: this.newCategory.get('id_Categoria')!.value,
      nombre_Categoria: this.newCategory.get('nombre_Categoria')!.value,
      descripcion: this.newCategory.get('descripcion')!.value,
    };
    this.categoriesService.newCateogy(credentials).subscribe(
      (response) => {
        this.isLoading = false;
        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Categoria registrado con éxito!',
            detail: 'SE HA AGREGADO UNA NUEVA CATEGORIA',
          });
        }, 100);
        this.getAllCategories();
      },
      (error) => {
        this.isLoading = false;
        console.error('Error en el registro:', error);
      }
    );
  }
}
