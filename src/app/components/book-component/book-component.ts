import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { TableModule } from 'primeng/table';
import { BookService } from '../../services/book-service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';


@Component({
  selector: 'app-book-component',
  imports: [AsyncPipe, TableModule, ChipModule, ButtonModule, CardModule, TagModule, CommonModule],
  standalone: true, 
  templateUrl: './book-component.html',
  styleUrl: './book-component.css',
})
export class BookComponent {

  bookService = inject(BookService);  
  books$ = this.bookService.getBooks();
 
}
  