// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { routeConfig } from './app/routes';
import { categoryReducer } from './app/store/category';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    provideStore({
      categories: categoryReducer,
    }),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
