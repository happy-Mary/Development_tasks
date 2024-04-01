import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import { CategoryService } from "../../services/category.service";
import { categoryActions } from "./category.actions";
import { Injectable } from "@angular/core";

@Injectable()
export class CategoriesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly categoriesService: CategoryService
  ) {}

  categoriesListLoad$ = createEffect(() => {
    const {
      categoriesListLoad,
      categoriesListSuccess,
      categoriesListError,
    } = categoryActions;
    
    return this.actions$.pipe(
      ofType(categoriesListLoad),
      mergeMap(
        () => this.categoriesService.getCategories()
        .pipe(
          map((categories) => categoriesListSuccess({ payload: categories })),
          catchError(() => of(categoriesListError()))
        )
      )
    )
  });

  addCategory$ = createEffect(() => {
    const { addCategory, addCategorySuccess, addCategoryError } = categoryActions;

    return this.actions$.pipe(
      ofType(addCategory),
      mergeMap(
        ({ category }) => this.categoriesService.addCategory(category)
        .pipe(
          map((category) => addCategorySuccess({ payload: category })),
          catchError(() => of(addCategoryError()))
        )
      )
    );
  });

  deleteCategory$ = createEffect(() => {
    const { deleteCategory, deleteCategorySuccess, deleteCategoryError } = categoryActions;
    return this.actions$.pipe(
      ofType(deleteCategory),
      mergeMap(
        ({ id }) => this.categoriesService.deleteCategory(id)
        .pipe(
          map(() => deleteCategorySuccess({ id })),
          catchError(() => of(deleteCategoryError()))
        )
      )
    );
  })
}