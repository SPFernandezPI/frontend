import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IdStorageService } from '../../../../../shared/services/idService.service';
import { Table, TableModule } from 'primeng/table';
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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-users',
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
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.scss',
  providers: [MessageService],
})
export class TableUsersComponent implements OnInit {
  //ARRAYS tablas
  public teachers!: any[];
  public visibleEdit: boolean = false;

  //Search
  @ViewChild('dt2') dt2!: Table;
  public searchValue = '';

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private idService: IdStorageService
  ) {}

  ngOnInit(): void {
    this.getAllTeachers();
  }

  applyGlobalFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    if (this.dt2) {
      this.dt2.filterGlobal(inputValue, 'contains');
    }
  }

  getAllTeachers() {
    this.userService.getAllTeachers().subscribe((resp) => {
      this.teachers = resp.value;
    });
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  showDialogEdit() {
    this.visibleEdit = true;
  }

  deleteUser() {
    Swal.fire({
      title: '¿Seguro que quiere eliminar a este usuario?',
      text: 'El profesor dejará de administrar la clase asignada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#09363b',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Eliminado',
          text: 'El usuario fue eliminado con exito',
          icon: 'success',
          confirmButtonColor: '#09363b',
        });
        this.getAllTeachers();
      }
    });
  }
}
