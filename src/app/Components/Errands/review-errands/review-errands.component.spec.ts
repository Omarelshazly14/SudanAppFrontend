import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewErrandsComponent } from './review-errands.component';

describe('ReviewErrandsComponent', () => {
  let component: ReviewErrandsComponent;
  let fixture: ComponentFixture<ReviewErrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewErrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewErrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
