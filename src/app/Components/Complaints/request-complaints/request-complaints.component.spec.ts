import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestComplaintsComponent } from './request-complaints.component';

describe('RequestComplaintsComponent', () => {
  let component: RequestComplaintsComponent;
  let fixture: ComponentFixture<RequestComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
