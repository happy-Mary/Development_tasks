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

  categoriesListLoaded$ = createEffect(() => {
    const {
      categoriesListLoaded,
      categoriesListSuccess,
      categoriesListError,
    } = categoryActions;
    
    return this.actions$.pipe(
      ofType(categoriesListLoaded),
      mergeMap(() => this.categoriesService.getCategories().pipe(
        map((categories) => categoriesListSuccess({ payload: categories })),
        catchError(() => of(categoriesListError()))
      ))
    )
  });
}