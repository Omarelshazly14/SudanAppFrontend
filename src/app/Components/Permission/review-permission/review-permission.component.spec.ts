import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPermissionComponent } from './review-permission.component';

describe('ReviewPermissionComponent', () => {
  let component: ReviewPermissionComponent;
  let fixture: ComponentFixture<ReviewPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewPermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
