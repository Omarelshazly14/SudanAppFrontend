import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComplaintsComponent } from './review-complaints.component';

describe('ReviewComplaintsComponent', () => {
  let component: ReviewComplaintsComponent;
  let fixture: ComponentFixture<ReviewComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
