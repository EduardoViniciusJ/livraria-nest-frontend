import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { TableModule } from 'primeng/table';
import { BookService } from '../../services/book-service';

@Component({
  selector: 'app-book-component',
  imports: [CommonModule, AsyncPipe, DecimalPipe, TableModule, ChipModule],
  standalone: true, 
  templateUrl: './book-component.html',
  styleUrl: './book-component.css',
})
export class BookComponent {

  bookService = inject(BookService);  
  books$ = this.bookService.getBooks();
}
  