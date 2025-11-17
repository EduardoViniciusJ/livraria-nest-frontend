import { Routes } from '@angular/router';
import { BookComponent } from './components/book-component/book-component';
import { CategoryComponent } from './components/category-component/category-component';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' }, 
  { path: 'books', component: BookComponent },
  { path: 'categories', component: CategoryComponent }
];