import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from "@angular/forms";
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-list-presenter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './category-list-presenter.component.html',
  styleUrls: ['./category-list-presenter.component.css']
})
export class CategoryListPresenterComponent {
  @Input() categories!: Category[];
  @Output() categoryAdded = new EventEmitter<Category>();
  @Output() categoryDeleted = new EventEmitter<Category>();
  newCategoryName = '';

  addCategory() {
    this.categoryAdded.emit({ name: this.newCategoryName });
  }

  deleteCategory(category: Category) {
    this.categoryDeleted.emit(category);
  }
}
