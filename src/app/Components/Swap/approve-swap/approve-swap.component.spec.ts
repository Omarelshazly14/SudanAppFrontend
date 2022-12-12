import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveSwapComponent } from './approve-swap.component';

describe('ApproveSwapComponent', () => {
  let component: ApproveSwapComponent;
  let fixture: ComponentFixture<ApproveSwapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveSwapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveSwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
