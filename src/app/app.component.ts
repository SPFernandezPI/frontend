import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './out/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  @HostListener('window:beforeunload', ['$event'])
  clearLocalStorage(event: Event) {
    this.authService.logout();
  }
}
