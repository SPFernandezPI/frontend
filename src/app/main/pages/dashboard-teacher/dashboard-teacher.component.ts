import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';
import { ProductService } from '../../services/product.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CategoryService } from '../../services/category.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-dashboard-teacher',
  standalone: true,
  imports: [
    CommonModule,
    TabMenuModule,
    AccordionModule,
    TableModule,
    ButtonModule,
    SpinnerComponent,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    InputTextareaModule,
    CardModule,
    ToastModule,
  ],
  templateUrl: './dashboard-teacher.component.html',
  styleUrl: './dashboard-teacher.component.scss',
  providers: [MessageService],
})
export class DashboardTeacherComponent implements OnInit {
  // TABMENU
  public items: MenuItem[] | undefined;
  public activeItem: MenuItem | undefined;
  //ARRAYS
  public clasesForTeacher: any[] = [];
  public studentsForClass: any[] = [];

  //Spinner
  public isLoading: boolean = false;

  //NewClass
  idUser!: number;
  productForm!: FormGroup;
  @ViewChild('imagenInput') imagenInput!: ElementRef;

  dificult = [
    { label: 'Baja', value: 'baja' },
    { label: 'Media', value: 'media' },
    { label: 'Alta', value: 'alta' },
  ];

  category: any[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private userService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.items = [
      { label: 'Clases', icon: 'pi pi-book', command: () => {} },
      { label: 'Nueva Clase', icon: 'pi pi-users', command: () => {} },
    ];
    this.activeItem = this.items[0];
  }

  ngOnInit(): void {
    if (localStorage.getItem('user_id')!) {
      this.idUser = Number(localStorage.getItem('user_id'));
      this.getAllProductsForTeacher(this.idUser);
    }
    this.initForm();
    this.getCategory();
  }

  getAllProductsForTeacher(id: number) {
    this.productService.getAllProductsForTeacher(id).subscribe(
      (resp) => {
        this.clasesForTeacher = resp.value;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getStudents(id: number) {
    this.isLoading = true;
    this.productService.getStudentsForClass(id).subscribe(
      (resp) => {
        this.isLoading = false;
        this.studentsForClass = resp.value.alumnos;
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  deleteUser(idUsuario: number, idProduct: number) {
    Swal.fire({
      title: '¿Seguro que quiere eliminar a este usuario?',
      text: 'El alumno sera removido de las clases asignadas',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#09363b',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(idUsuario).subscribe(
          (resp) => {
            Swal.fire({
              title: 'Eliminado',
              text: 'El usuario fue eliminado con exito',
              icon: 'success',
              confirmButtonColor: '#09363b',
            });
            this.getStudents(idProduct);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  private initForm() {
    this.productForm = this.fb.group({
      id_Producto: [0],
      nombre_Producto: ['', [Validators.required, Validators.minLength(3)]],
      id_Usuario: [this.idUser],
      dificultad: ['', Validators.required],
      cant_Clases: ['', [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      imagenUrl: ['', Validators.required],
      id_Categoria: [0, Validators.required],
      enlaceMeet: [
        '',
        [Validators.required, Validators.pattern('https://meet.google.com/.*')],
      ],
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productDTO = this.productForm.value;
      this.productService.postNewProduct(productDTO).subscribe((resp) => {
        this.messageService.add({
          severity: 'success',
          summary: '¡El producto se creo exitosamente!',
          detail: 'SE HA AGREGADO UN NUEVO PRODUCTO',
        });
        this.productForm.reset();
      });
    } else {
      Object.keys(this.productForm.controls).forEach((key) => {
        const control = this.productForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  get isFormInvalid(): boolean {
    return this.productForm.invalid && this.productForm.touched;
  }

  seleccionarImagen() {
    this.imagenInput.nativeElement.click();
  }

  cargarImagen(event: Event) {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onload = () => {
        const imagenBase64 = lector.result as string;
        this.productForm.patchValue({ imagenUrl: imagenBase64 });
      };
      lector.readAsDataURL(archivo);
    }
  }

  private getCategory() {
    this.categoryService.getCategories().subscribe((resp) => {
      this.category = resp.value;
    });
  }
}
