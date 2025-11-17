import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category-service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-category-component',
  imports: [AsyncPipe, TableModule, ChipModule, ButtonModule, CardModule, TagModule, CommonModule, DataViewModule, ButtonModule, SelectButtonModule, FormsModule, ToolbarModule, FileUploadModule, RatingModule],
  standalone: true,
  templateUrl: './category-component.html',
  styleUrl: './category-component.css',
})
export class CategoryComponent {
  categoryService = inject(CategoryService);

  categories$ = this.categoryService.getCategory();

  deleteCategory(category: any) {
  this.categoryService.deleteCategory(category.id).subscribe({
    next: () => {
      this.categories$ = this.categoryService.getCategory(); 
    },
    error: (err) => {
      console.error('Erro ao excluir categoria', err);
    }
  });
}
}
