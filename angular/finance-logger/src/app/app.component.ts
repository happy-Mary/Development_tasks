import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Category } from './models/category';
import { categoryActions } from './store/category/category.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  standalone: true,
})
export class AppComponent implements OnInit {
  title = 'Finance Logger with NgRX';

  ngOnInit(): void {}

  updateCategory(category: Category) {
    categoryActions.updateCategory({ category });
  }

  removeAllCategories() {
    categoryActions.deleteAllCategories();
  }
}
