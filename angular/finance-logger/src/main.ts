import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi
} from "@angular/common/http";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule, provideStore, StoreRootModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { AppComponent } from './app/app.component';
import { routeConfig } from './app/routes';
import { categoryReducer, CategoriesEffects } from './app/store/category';
import { logsReducer, LogsEffects } from './app/store/logs';
import { MockHttpErrorInterceptor } from './app/services/interceptors/mock-error.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MockHttpErrorInterceptor, multi: true },
    provideRouter(routeConfig),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(MatSnackBarModule),
    
    // NGRX
    // provideStore({ categoryFeature: categoryReducer, logsFeature: logsReducer }),
    provideStore({}),
    importProvidersFrom(StoreRootModule),
    importProvidersFrom(StoreModule.forFeature("categoryFeature", categoryReducer)),
    importProvidersFrom(StoreModule.forFeature("logsFeature", logsReducer)),
    provideEffects([CategoriesEffects, LogsEffects]),
    // importProvidersFrom(EffectsModule.forFeature([CategoriesEffects, LogsEffects])),
    provideAnimations(),
],
}).catch((err) => console.error(err));
