import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestLeavesComponent } from './request-leaves.component';

describe('RequestLeavesComponent', () => {
  let component: RequestLeavesComponent;
  let fixture: ComponentFixture<RequestLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestLeavesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
