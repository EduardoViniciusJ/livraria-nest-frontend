import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CategoryService } from '../../services/category-service';
import { CategoryFormComponent } from '../category-form-category/category-form-category';
import { Category } from '../../interfaces/category-interface';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-category-component',
  standalone: true,
  providers: [MessageService],
  imports: [
    AsyncPipe, CommonModule, TableModule, ButtonModule, DialogModule,
    ToastModule, CategoryFormComponent
  ],
  templateUrl: './category-component.html',
  styleUrls: ['./category-component.css'],
})
export class CategoryComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private messageService = inject(MessageService);

  categories$!: Observable<Category[]>;
  dialogVisible = false;
  selectedCategory: Category | null = null;

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories() {
    this.categories$ = this.categoryService.getCategory().pipe(
      catchError(() => of([]))
    );
  }

  openDialog(category: Category | null = null) {
    this.selectedCategory = category;
    this.dialogVisible = true;
  }

  closeDialog() {
    this.dialogVisible = false;
    this.selectedCategory = null;
  }

  saveCategory(data: { name: string }) {
    if (this.selectedCategory) {
      this.categoryService.updateCategory(this.selectedCategory.id, data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria atualizada com sucesso!' });
          this.closeDialog();
          this.loadCategories();
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error?.message || 'Erro ao atualizar categoria.' });
        }
      });
    } else {
      this.categoryService.createCategory(data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria criada com sucesso!' });
          this.closeDialog();
          this.loadCategories();
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error?.message || 'Erro ao criar categoria.' });
        }
      });
    }
  }

  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category.id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria excluída com sucesso!' });
        this.loadCategories();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error?.message || 'Erro ao excluir categoria.' });
      }
    });
  }
}
