import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryState } from 'src/app/store/category';
import { selectCategories } from '../../store/category/category.selectors';
import { categoryActions } from 'src/app/store/category';
import { CategoryListPresenterComponent } from '../category-list-presenter/category-list-presenter.component';

@Component({
  selector: 'app-category-list-container',
  templateUrl: './category-list-container.component.html',
  styleUrls: ['./category-list-container.component.css'],
  imports: [CommonModule, CategoryListPresenterComponent],
  standalone: true,
})
export class CategoryListContainerComponent {
  categories$: Observable<Category[]> = this.store.select(selectCategories);

  constructor(private readonly store: Store<{ categories: CategoryState }>) {
    // this.categories$.subscribe((val) => console.log('CCC', val));
  }

  addCategory(category: Category) {
    this.store.dispatch(categoryActions.addCategory({ category }));
  }

  deleteCategory({ name }: Category) {
    this.store.dispatch(categoryActions.deleteCategory({ name }));
  }
}
