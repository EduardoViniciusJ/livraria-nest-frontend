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

  getCategory() : Observable<Category[]> {
    return this.http.get<Category[]>(this.urlAPI);  
  }  
}
