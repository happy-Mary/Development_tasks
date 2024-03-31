import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { categories } from "../../state/selectors";
import { CategoryListPresenterComponent } from '../category-list-presenter/category-list-presenter.component';
import { CommonModule } from '@angular/common';
import { AppState } from 'src/app/state';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-list-container',
  templateUrl: './category-list-container.component.html',
  styleUrls: ['./category-list-container.component.css'],
  imports: [CommonModule, CategoryListPresenterComponent],
  standalone: true,
})
export class CategoryListContainerComponent {
  // categories$: Observable<Category[]> = this.store.select(state => state.categories);
  
  categories$: Observable<any> = this.store.select(categories);

  constructor(private readonly store: Store<{ categories: AppState }>) {
    this.categories$.subscribe(val => console.log(val));
  }
}
