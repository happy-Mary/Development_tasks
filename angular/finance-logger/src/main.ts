// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AppComponent } from './app/app.component';
import { routeConfig } from './app/routes';
import { categoryReducer, CategoriesEffects } from './app/store/category';
import { CategoryService } from './app/services/category.service';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    // { provide: CategoryService, useClass: CategoryService },
    // {provide: BACKEND_URL, useValue: 'https://photoapp.looknongmodules.com/api'},
    provideRouter(routeConfig),
    importProvidersFrom(HttpClientModule),
    provideStore({
        categories: categoryReducer,
    }),
    provideEffects([CategoriesEffects]),
    provideAnimations(),
],
}).catch((err) => console.error(err));
