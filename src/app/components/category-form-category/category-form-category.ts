import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Category } from '../../interfaces/category-interface'; // importe sua interface de categoria

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './category-form-category.html'
})
export class CategoryFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input() category: Category | null = null;  
  @Output() cancel = new EventEmitter<void>();
  @Output() submit = new EventEmitter<{ name: string }>();

  form: FormGroup = this.fb.group({
    name: [
      '', 
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(254),
        Validators.pattern(/\S+/) // não permite apenas espaços
      ]
    ]
  });

  ngOnInit() {
    if (this.category) {
      this.form.patchValue({ name: this.category.name });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submit.emit({ name: this.form.value.name.trim() });
  }

  onCancel() {
    this.cancel.emit();
  }
}
