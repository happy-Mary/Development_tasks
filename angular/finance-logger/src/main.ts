// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from "@angular/common/http";
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AppComponent } from './app/app.component';
import { routeConfig } from './app/routes';
import { categoryReducer, CategoriesEffects } from './app/store/category';
import { MockHttpErrorInterceptor } from './app/services/interceptors/mock-error.interceptor';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

bootstrapApplication(AppComponent, {
  providers: [
    // { provide: CategoryService, useClass: CategoryService },
    // { provide: BACKEND_URL, useValue: 'https://photoapp.looknongmodules.com/api' },
    { provide: HTTP_INTERCEPTORS, useClass: MockHttpErrorInterceptor, multi: true },
    provideRouter(routeConfig),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(MatSnackBarModule),
    provideStore({ categories: categoryReducer }),
    provideEffects([CategoriesEffects]),
    provideAnimations(),
],
}).catch((err) => console.error(err));
