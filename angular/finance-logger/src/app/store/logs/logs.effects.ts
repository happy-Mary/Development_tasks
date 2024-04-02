import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable } from "@angular/core";
import { of, mergeMap } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { LogsService } from "src/app/services/logs.service";
import { logsActions } from "./logs.actions";
import { Log } from "src/app/models/logs";

const SNACKBAR_CONFIG: MatSnackBarConfig = {
  duration: 2000,
  verticalPosition: "top",
  horizontalPosition: "center"
};

const SUCCESS_MSG = {
  LOAD: "Logs successfully loaded",
  ADD: "Logs successfully added",
  DELETE: "Logs successfully deleted",
}

const ERROR_MSG = {
  LOAD: "Logs could not be loaded",
  ADD: "Logs addition failed",
  DELETE: "Logs deletion failed",
}

@Injectable()
export class LogsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly logsService: LogsService,
    private readonly snackBar: MatSnackBar,
  ) {}

  logsListLoad$ = createEffect(() => {
    const {
      logsListLoad,
      logsListSuccess,
      logsListError,
    } = logsActions;
    
    return this.actions$.pipe(
      ofType(logsListLoad),
      mergeMap(
        () => this.logsService.getLogs()
        .pipe(
          map((logs: Log[]) => {
            console.log('Error from server should go')
            return logsListSuccess({ payload: logs, message: SUCCESS_MSG.LOAD })
          }),
          catchError((err) => {
            console.log('Error from server catched', err)
            return of(logsListError({ message: ERROR_MSG.LOAD }))
          })
        )
      )
    )
  });

  addLog$ = createEffect(() => {
    const { addLog, addLogSuccess, addLogError } = logsActions;

    return this.actions$.pipe(
      ofType(addLog),
      mergeMap(({ log }) => 
        this.logsService.addLog(log)
        .pipe(
          map((payload) => addLogSuccess({ payload, message: SUCCESS_MSG.ADD })),
          catchError(() => of(addLogError({ message: ERROR_MSG.ADD })))
        )
      )
    );
  });

  handleSuccessMessage$ = createEffect(() => {
    const {
      logsListSuccess,
      addLogSuccess,
    } = logsActions;
      return this.actions$.pipe(
        ofType(logsListSuccess, addLogSuccess),
        tap(({ message }) => {
          this.snackBar.open(message || 'Success', 'Dismiss', SNACKBAR_CONFIG);
        })
    );
  }, { dispatch: false });

  handleErrorMessage$ = createEffect(() => {
    const {
      logsListError,
      addLogError,
    } = logsActions
      return this.actions$.pipe(
        ofType(logsListError, addLogError),
        tap(({ message }) => {
          this.snackBar.open(message || 'Failed', '', SNACKBAR_CONFIG);
        }
      )
    );
  }, { dispatch: false });
}