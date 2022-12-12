import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveErrandsComponent } from './approve-errands.component';

describe('ApproveErrandsComponent', () => {
  let component: ApproveErrandsComponent;
  let fixture: ComponentFixture<ApproveErrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveErrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveErrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
