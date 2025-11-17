import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { TableModule } from 'primeng/table';
import { BookService } from '../../services/book-service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { FileUploadModule } from 'primeng/fileupload';
import { Book } from '../../interfaces/book-interface';

@Component({
  selector: 'app-book-component',
  imports: [
    AsyncPipe, TableModule, ChipModule, ButtonModule, CardModule,
    TagModule, CommonModule, DataViewModule, SelectButtonModule,
    FormsModule, ToolbarModule, FileUploadModule, RatingModule
  ],
  standalone: true,
  templateUrl: './book-component.html',
  styleUrl: './book-component.css',
})
export class BookComponent {

  bookService = inject(BookService);
  books$ = this.bookService.getBooks();

  getImageUrl(imageName: string | undefined): string {
    if (!imageName) {
      return '/images/Image-not-found.png'; // retorna imagem padrão se não houver imagem
    }
    return `/images/${imageName}`;
  }

  deleteBook(book: Book) {
  this.bookService.deleteBook(book.id).subscribe({
    next: () => {
      this.books$ = this.bookService.getBooks();
    },
    error: (err) => {
      console.error('Erro ao excluir livro', err);
    }
  });
  }
}
