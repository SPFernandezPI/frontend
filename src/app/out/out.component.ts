import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-out',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './out.component.html',
  styleUrl: './out.component.scss',
})
export class OutComponent {}
