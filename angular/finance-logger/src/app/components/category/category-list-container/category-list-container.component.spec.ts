import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListContainerComponent } from './category-list-container.component';

describe('CategoryListContainerComponent', () => {
  let component: CategoryListContainerComponent;
  let fixture: ComponentFixture<CategoryListContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryListContainerComponent]
    });
    fixture = TestBed.createComponent(CategoryListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
