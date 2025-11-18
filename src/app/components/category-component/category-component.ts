import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category-service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Category } from '../../interfaces/category-interface';
import { CategoryFormComponent } from '../category-form-category/category-form-category';

@Component({
  selector: 'app-category-component',
  standalone: true,
  providers: [MessageService],
  imports: [
    AsyncPipe, CommonModule, TableModule, ButtonModule, DialogModule,
    FormsModule, ReactiveFormsModule, ToastModule,   
  ],
  templateUrl: './category-component.html',
  styleUrl: './category-component.css',
})
export class CategoryComponent {

  categoryService = inject(CategoryService);

  fb = inject(FormBuilder);

  messageService = inject(MessageService);

  categories$ = this.categoryService.getCategory();

  dialogVisible = false;
  selectedCategory: Category | null = null;

  form: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(254),
        Validators.pattern(/^(?!\s+$).+/)
      ]
    ]
  });

  // Abre o form para criar ou editar uma categoria
  openDialog(category: Category | null = null) {
    this.selectedCategory = category;

    if (category) {
      this.form.patchValue(category);
    } else {
      this.form.reset();
    }

    this.dialogVisible = true;
  }

  // Fecha o form e reseta 
  closeDialog() {
    this.dialogVisible = false;
    this.selectedCategory = null;
    this.form.reset();
  }

  // Salva categoria 
  saveCategory() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = {
      name: this.form.value.name.trim()
    };

    if (this.selectedCategory) {
      this.categoryService.updateCategory(this.selectedCategory.id, formData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria atualizada com sucesso!' });
          this.closeDialog();
          this.categories$ = this.categoryService.getCategory();
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error.message || 'Erro ao atualizar categoria.' });
        }
      });
    } else {
      this.categoryService.createCategory(formData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria criada com sucesso!' });
          this.closeDialog();
          this.categories$ = this.categoryService.getCategory();
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error.message || 'Erro ao criar categoria.' });
        }
      });
    }
  }

  // Exclui uma categoria
  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category.id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria excluída com sucesso!' });
        this.categories$ = this.categoryService.getCategory();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Erro ao excluir', detail: err.error.message });
      }
    });
  }
}
