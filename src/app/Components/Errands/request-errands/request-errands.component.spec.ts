import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestErrandsComponent } from './request-errands.component';

describe('RequestErrandsComponent', () => {
  let component: RequestErrandsComponent;
  let fixture: ComponentFixture<RequestErrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestErrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestErrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
