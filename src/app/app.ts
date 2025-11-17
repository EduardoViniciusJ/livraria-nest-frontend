import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from './components/navbar-component/navbar-component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, NavbarComponent, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('livraria-nest');
}
