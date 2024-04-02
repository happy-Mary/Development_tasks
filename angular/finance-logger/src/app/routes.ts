import { Routes } from '@angular/router';
import { CategoryListContainerComponent } from './components/category/category-list-container/category-list-container.component';

export const routeConfig: Routes = [
  { 
    path: 'categories',
    loadComponent: 
    () => import("./components/category/category-list-container/category-list-container.component")
    .then((m) => m.CategoryListContainerComponent),
  },
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
  { path: '**', component: CategoryListContainerComponent },
];
