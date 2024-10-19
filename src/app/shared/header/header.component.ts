import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AuthService } from '../../out/services/auth.service';
import { UserService } from '../../main/services/user.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    SplitButtonModule,
    AvatarModule,
    AvatarGroupModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public items: MenuItem[];

  public nameUser?: string;
  public roleUser?: string;
  public initialsUser?: string;

  public isUserLogued: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.items = [
      {
        label: 'Cerrar sesión',
        command: () => {
          this.logOut();
        },
      },
      {
        label: 'Perfil',
        command: () => {
          this.goToInfoProfile();
        },
      },
      {
        label: 'Mis favoritos',
        command: () => {
          this.goToFavorites();
        },
      },
    ];
  }

  ngOnInit(): void {
    if (localStorage.getItem('user_id')!) {
      this.getInfoUser();
    }
  }

  getInfoUser() {
    this.isUserLogued = true;
    this.userService
      .getInfoUserById(Number(localStorage.getItem('user_id')!))
      .pipe(
        finalize(() => (this.initialsUser = this.getInitials(this.nameUser!)))
      )
      .subscribe(
        (resp) => {
          this.nameUser = resp.value.nombre_Usuario;
          this.roleUser = localStorage.getItem('user_role')!;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getInitials(fullName: string): string {
    if (!fullName) return '';
    const nameParts = fullName.split(' ');
    const initials =
      nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`
        : `${nameParts[0][0]}`;

    return initials.toUpperCase();
  }

  logOut() {
    this.authService.logout();
  }

  goToInfoProfile() {}

  goToFavorites() {
    this.router.navigate(['/main/product/favorites']);
  }

  goToHome() {
    this.router.navigate(['/main/home']);
  }

  goToLogin() {
    this.router.navigate(['/out/login/log']);
  }

  goToCreate() {
    this.router.navigate(['/out/login/register']);
  }
}
