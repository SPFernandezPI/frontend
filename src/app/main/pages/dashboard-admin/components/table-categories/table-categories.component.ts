import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
})
export class TableCategoriesComponent implements OnInit {
  //Array
  public categories: any[] = [];
  //Search
  @ViewChild('dt2') dt2!: Table;
  public searchValue = '';

  constructor(
    private categoriesService: CategoryService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

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
}
