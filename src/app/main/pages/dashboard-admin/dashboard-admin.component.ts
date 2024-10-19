import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { TableStudentsComponent } from './components/table-students/table-students.component';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    CommonModule,
    TabMenuModule,
    TableUsersComponent,
    TableStudentsComponent,
  ],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss',
  providers: [MessageService],
})
export class DashboardAdminComponent implements OnInit {
  // TABMENU
  public items: MenuItem[] | undefined;
  public activeItem: MenuItem | undefined;

  constructor(private router: Router) {
    this.items = [
      { label: 'Profesores', icon: 'pi pi-user', command: () => {} },
      { label: 'Alumnos', icon: 'pi pi-users', command: () => {} },
      { label: 'Categorias', icon: 'pi pi-table', command: () => {} },
      { label: 'Clases', icon: 'pi pi-book', command: () => {} },
    ];
    this.activeItem = this.items[0];
  }

  ngOnInit(): void {}
}
