import { Component, OnInit } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';
import { ProductService } from '../../services/product.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
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
  ],
  templateUrl: './dashboard-teacher.component.html',
  styleUrl: './dashboard-teacher.component.scss',
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

  constructor(
    private router: Router,
    private productService: ProductService,
    private userService: UserService
  ) {
    this.items = [
      { label: 'Clases', icon: 'pi pi-book', command: () => {} },
      { label: 'Nueva Clase', icon: 'pi pi-users', command: () => {} },
    ];
    this.activeItem = this.items[0];
  }

  ngOnInit(): void {
    if (localStorage.getItem('user_id')!) {
      let id = Number(localStorage.getItem('user_id'));
      this.getAllProductsForTeacher(id);
    }
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
}
