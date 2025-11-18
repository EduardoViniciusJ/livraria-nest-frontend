import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Book } from '../../interfaces/book-interface';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MultiSelectModule, ButtonModule, InputTextModule],
  templateUrl: './book-form-component.html'
})
export class BookFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input() categories: { id: number; name: string }[] = [];
  @Input() book: Book | null = null;

  // Eventos utilizados para disparar no form de cadastro e atualização
  @Output() cancel = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();

  selectedImage: File | null = null;

  // Form validações já definidas
  form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(254)]],
    author: ['', [Validators.required, Validators.maxLength(254)]],
    price: [null, [Validators.required, Validators.min(1)]],
    imageUrl: [''],
    categories: [[], [Validators.required]]
  });

  ngOnInit() {
    // Se existir um livro, ele preenche o form 
    if (this.book) {
      this.form.patchValue({
        title: this.book.title,
        author: this.book.author,
        price: this.book.price,
        imageUrl: this.book.imageUrl,
        categories: this.book.categories.map((categoryId: any) => categoryId.id)
      });
    }
  }

  onFileChange(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['jpg', 'jpeg', 'png'].includes(ext!)) {
      alert('A imagem deve ser JPG ou PNG');
      return;
    }

    this.selectedImage = file;
    this.form.patchValue({ imageUrl: file.name }); 
  }

  onCancel() {
    this.cancel.emit();
  }
  
  // Envia o form para o componente pai 
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;
    const formData = {
      title: data.title,
      author: data.author,
      price: Number(data.price),
      imageUrl: data.imageUrl ?? null,
      categories: data.categories.map((id: string | number) => Number(id))
    };

    this.submit.emit(formData);
  }
}
