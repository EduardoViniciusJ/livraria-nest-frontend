import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [MenubarModule, BreadcrumbModule, RouterModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {

  items : MenuItem[] = [
    { label: 'Livros', routerLink: '/books'},
    { label: 'Categorias', routerLink: '/categories'}
  ]
}
