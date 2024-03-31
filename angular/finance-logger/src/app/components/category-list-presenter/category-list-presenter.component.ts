import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-list-presenter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatListModule],
  templateUrl: './category-list-presenter.component.html',
  styleUrls: ['./category-list-presenter.component.css']
})
export class CategoryListPresenterComponent {
  @Input() categories!: Category[];
}
