import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Category } from '../interfaces/category-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  private readonly urlAPI = `${environment.API_URL}/category`;


  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.urlAPI);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.urlAPI}/${id}`);
  }

  createCategory(data: { name: string }): Observable<Category> {
    return this.http.post<Category>(`${this.urlAPI}/create`, data);
  }

  updateCategory(id: number, data: { name: string }): Observable<Category> {
    return this.http.put<Category>(`${this.urlAPI}/update/${id}`, data);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.urlAPI}/delete/${id}`);
  }
}
