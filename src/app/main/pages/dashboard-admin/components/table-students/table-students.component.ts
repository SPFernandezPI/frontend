import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { UserService } from '../../../../services/user.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SpinnerComponent } from '../../../../../shared/spinner/spinner.component';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../../../../out/services/auth.service';

@Component({
  selector: 'app-table-students',
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
  templateUrl: './table-students.component.html',
  styleUrl: './table-students.component.scss',
})
export class TableStudentsComponent implements OnInit {
  //Spinner
  public isLoading = false;
  //ARRAYS tablas
  public students!: any[];
  //AddUser
  public registerForm: FormGroup;
  public updateForm: FormGroup;
  //Modales
  public visibleEdit: boolean = false;
  public idUserEdit!: number;
  public visibleAdd: boolean = false;

  //Search
  @ViewChild('dt2') dt2!: Table;
  public searchValue = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.registerForm = this.fb.group({
      nombre_Usuario: ['', [Validators.required, Validators.minLength(8)]],
      mail_Usuario: [
        '',
        [Validators.required, Validators.email, Validators.pattern(/^\S.*$/)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.authService.passwordValidator,
        ],
      ],
    });
    this.updateForm = this.fb.group({
      nombre_Usuario: ['', [Validators.required, Validators.minLength(8)]],
      mail_Usuario: [
        '',
        [Validators.required, Validators.email, Validators.pattern(/^\S.*$/)],
      ],
    });
  }

  ngOnInit(): void {
    this.getAllStudents();
  }

  applyGlobalFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    if (this.dt2) {
      this.dt2.filterGlobal(inputValue, 'contains');
    }
  }

  getAllStudents() {
    this.userService.getAllStudent().subscribe((resp) => {
      this.students = resp.value;
    });
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  showDialogEdit(id: number) {
    this.visibleEdit = true;
    this.idUserEdit = id;
  }

  showDialogAdd() {
    this.visibleAdd = true;
  }

  addTeacher() {
    this.isLoading = true;
    let credentials = {
      id_Usuario: 0,
      nombre_Usuario: this.registerForm.get('nombre_Usuario')!.value,
      mail_Usuario: this.registerForm.get('mail_Usuario')!.value,
      password: this.registerForm.get('password')!.value,
      id_Rol: 3,
      rolDescripcion: '',
    };
    this.authService.register(credentials).subscribe(
      (response) => {
        this.isLoading = false;
        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: '¡Usuario registrado con éxito!',
            detail: 'SE HA ENVIADO EL CORREO ELECTRONICO',
          });
        }, 100);
        this.getAllStudents();
      },
      (error) => {
        this.isLoading = false;
        console.error('Error en el registro:', error);
      }
    );
  }

  updateTeacher() {
    this.isLoading = true;
    let credentials = {
      nombre_Usuario: this.updateForm.get('nombre_Usuario')!.value,
      mail_Usuario: this.updateForm.get('mail_Usuario')!.value,
    };
    this.userService.updateUser(this.idUserEdit, credentials).subscribe(
      (response) => {
        this.isLoading = false;
        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: '¡Usuario editado con éxito!',
            detail: 'LOS DATOS FUERON ACTUALIZADOS',
          });
        }, 100);
        this.updateForm.reset();
        this.getAllStudents();
      },
      (error) => {
        this.isLoading = false;
        console.error('Error en el registro:', error);
      }
    );
  }

  deleteUser(idUsuario: number) {
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
            this.getAllStudents();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }
}
