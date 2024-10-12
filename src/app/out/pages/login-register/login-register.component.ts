import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { delay, finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, SpinnerComponent],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss',
  providers: [MessageService],
})
export class LoginRegisterComponent implements AfterViewInit {
  @ViewChild('container') container!: ElementRef;
  public isRegisterMobile: boolean = true;
  public isLoading: boolean = false;
  registerForm: FormGroup;
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private fb: FormBuilder
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
    this.loginForm = this.fb.group({
      mail_Usuario: [
        '',
        [Validators.required, Validators.pattern(/^\S.*$/), Validators.email],
      ],
      password: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    if (this.router.url.includes('login/register') && this.container) {
      this.container.nativeElement.classList.add('active');
    }
  }

  onLogin() {
    let crentials = {
      mail_Usuario: this.loginForm.get('mail_Usuario')!.value,
      password: this.loginForm.get('password')!.value,
    };
    this.authService.login(crentials).subscribe(
      (response) => {
        if (response.msg == 'El usuario no existe o la clave es incorrecta ') {
          this.messageService.add({
            severity: 'error',
            summary: 'El usuario no existe o la clave es incorrecta',
          });
        }
        this.authService.setToken(
          response.value.token,
          response.value.id_Usuario,
          response.value.rolDescripcion
        );
        this.router.navigate(['/main/home']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onRegister() {
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
            detail: 'REVISA TU CORREO ELECTRONICO',
          });
        }, 100);
        this.container.nativeElement.classList.remove('active');
      },
      (error) => {
        this.isLoading = false;
        console.error('Error en el registro:', error);
      }
    );
  }
  goRegisterBtn() {
    this.container.nativeElement.classList.add('active');
  }
  goLoginBtn() {
    this.container.nativeElement.classList.remove('active');
  }
  isDesktop(): boolean {
    const screenWidth = window.innerWidth;
    return screenWidth > 500;
  }
  goIsRegisterMobile() {
    this.isRegisterMobile = !this.isRegisterMobile;
  }
  onOutDash() {
    this.router.navigateByUrl('/main/home');
  }
}
