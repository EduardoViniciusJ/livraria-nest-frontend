import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BookService } from '../../services/book-service';
import { CategoryService } from '../../services/category-service';
import { BookFormComponent } from '../book-form-component/book-form-component';
import { Book } from '../../interfaces/book-interface';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-book-component',
  standalone: true,
  providers: [MessageService],
  imports: [
    AsyncPipe, CommonModule, TableModule, ButtonModule,
    DialogModule, ToastModule, BookFormComponent, TagModule
  ],
  templateUrl: './book-component.html'
})
export class BookComponent implements OnInit {
  private bookService = inject(BookService);
  private categoryService = inject(CategoryService);
  private messageService = inject(MessageService);

  books$!: Observable<Book[]>;
  categories$!: Observable<{ id: number; name: string }[]>;

  dialogVisible = false;
  selectedBook: Book | null = null;

  ngOnInit() {
    this.loadBooks();
    this.loadCategories();
  }
  
  // Carrega livros
  private loadBooks() {
    this.books$ = this.bookService.getBooks().pipe(
      catchError(() => of([]))
    );
  }

  // Carrega categorias para o select
  private loadCategories() {
    this.categories$ = this.categoryService.getCategory().pipe(
      catchError(() => of([]))
    );
  }

  // Abre o form para criar ou editar livro
  openDialog(book: Book | null = null) {
    this.selectedBook = book;
    this.dialogVisible = true;
  }

  // Fecha o form
  closeDialog() {
    this.dialogVisible = false;
    this.selectedBook = null;
  }

  // Salva o livro
  saveBook(formData: Book) {
    if (this.selectedBook) {
      this.bookService.updateBook(this.selectedBook.id, formData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Livro atualizado com sucesso!' });
          this.closeDialog();
          this.loadBooks();
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error.message || 'Erro ao atualizar livro.' });
        }
      });
    } else {
      this.bookService.createBook(formData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Livro criado com sucesso!' });
          this.closeDialog();
          this.loadBooks();
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error.message || 'Erro ao criar livro.' });
        }
      });
    }
  }
    
  // Excluir livro
  deleteBook(book: Book) {
    this.bookService.deleteBook(book.id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Livro excluído com sucesso!' });
        this.loadBooks();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error.message || 'Erro ao excluir livro.' });
      }
    });
  }

  getImageUrl(imageName: string | undefined): string {
    if (!imageName) {
      return '/images/Image-not-found.png'; // retorna imagem padrão se não houver imagem
    }
    return `/images/${imageName}`;
  }

  
}
