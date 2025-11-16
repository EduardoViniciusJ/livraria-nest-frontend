import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BookComponent } from './components/book-component/book-component';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, BookComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('livraria-nest');
}
