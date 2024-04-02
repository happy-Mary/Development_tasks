import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { of } from "rxjs";
import { mergeMap, map, catchError, tap } from "rxjs/operators";
import { CategoryService } from "../../services/category.service";
import { categoryActions } from "./category.actions";
import { Injectable } from "@angular/core";

const SNACKBAR_CONFIG: MatSnackBarConfig = {
  duration: 2000,
  verticalPosition: "top",
  horizontalPosition: "center"
};

const SUCCESS_MSG = {
  LOAD: "Categories successfully loaded",
  ADD: "Category successfully added",
  DELETE: "Category successfully deleted",
}

const ERROR_MSG = {
  LOAD: "Categories could not be loaded",
  ADD: "Category addition failed",
  DELETE: "Category deletion failed",
}

@Injectable()
export class CategoriesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly categoriesService: CategoryService,
    private readonly snackBar: MatSnackBar,
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
          map((categories) => {
            console.log('Error from server should go')
            return categoriesListSuccess({ payload: categories, message: SUCCESS_MSG.LOAD })
          }),
          catchError((err) => {
            console.log('Error from server catched', err)
            return of(categoriesListError({ message: ERROR_MSG.LOAD }))
          })
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
          map((category) => addCategorySuccess({ payload: category, message: SUCCESS_MSG.ADD })),
          catchError(() => of(addCategoryError({ message: ERROR_MSG.ADD })))
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
          map(() => deleteCategorySuccess({ id, message: SUCCESS_MSG.DELETE })),
          catchError(() => of(deleteCategoryError({ message: ERROR_MSG.DELETE })))
        )
      )
    );
  });

  handleSuccessMessage$ = createEffect(() => {
    const {
      categoriesListSuccess,
      addCategorySuccess,
      deleteCategorySuccess,
    } = categoryActions
      return this.actions$.pipe(
        ofType(categoriesListSuccess, addCategorySuccess, deleteCategorySuccess),
        tap(({ message }) => {
          this.snackBar.open(message || 'Success', 'Dismiss', SNACKBAR_CONFIG);
        })
    );
  }, { dispatch: false });

  handleErrorMessage$ = createEffect(() => {
    const {
      categoriesListError,
      addCategoryError,
      deleteCategoryError,
    } = categoryActions
      return this.actions$.pipe(
        ofType(categoriesListError, addCategoryError, deleteCategoryError),
        tap(({ message }) => {
          this.snackBar.open(message || 'Failed', '', SNACKBAR_CONFIG);
        })
    );
  }, { dispatch: false });
}