import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book-interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);
  private readonly urlAPI = `${environment.API_URL}/book`;

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.urlAPI);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.urlAPI}/${id}`);
  }

  createBook(data: any): Observable<Book> {
    return this.http.post<Book>(`${this.urlAPI}/create`, data);
  }

  updateBook(id: number, data: any): Observable<Book> {
    return this.http.put<Book>(`${this.urlAPI}/update/${id}`, data);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.urlAPI}/delete/${id}`);
  }
}
