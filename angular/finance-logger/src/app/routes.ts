import { Routes } from "@angular/router";
import { CategoryListContainerComponent } from "./components/category-list-container/category-list-container.component";

export const routeConfig: Routes = [
  { path: "categories", component: CategoryListContainerComponent },
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
  { path: '**', component: CategoryListContainerComponent }
];
