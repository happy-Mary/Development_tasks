import { Component, OnInit } from '@angular/core';
import { categoryActions } from './state/actions';
import { Category } from './models/category';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  standalone: true,
})
export class AppComponent implements OnInit {
  title = 'Finance Logger with NgRX';

  ngOnInit(): void {
    const newCategory: Category = { name: 'Food' };
    categoryActions.addCategory({ category: newCategory });
  }

  deleteCategory(category: Category) {
    categoryActions.deleteCategory({ name: category.name });
  }

  updateCategory(category: Category) {
    categoryActions.updateCategory({ category });
  }

  removeAllCategories() {
    categoryActions.deleteAllCategories();
  }
}
