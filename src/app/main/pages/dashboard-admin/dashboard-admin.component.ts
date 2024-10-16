import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { ToastModule } from 'primeng/toast';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem, MessageService } from 'primeng/api';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { IdStorageService } from '../../../shared/services/idService.service';

@Component({
  selector: 'app-dashboard-admin',
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
    TabMenuModule,
  ],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss',
  providers: [MessageService],
})
export class DashboardAdminComponent implements OnInit {
  // TABMENU
  public items: MenuItem[] | undefined;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private idService: IdStorageService
  ) {
    this.items = [
      { label: 'Profesores', icon: 'pi pi-user', command: () => {} },
      { label: 'Alumnos', icon: 'pi pi-users', command: () => {} },
      { label: 'Categorias', icon: 'pi pi-table', command: () => {} },
      { label: 'Clases', icon: 'pi pi-book', command: () => {} },
    ];
  }

  ngOnInit(): void {}
}
