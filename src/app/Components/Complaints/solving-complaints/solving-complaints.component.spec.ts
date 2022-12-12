import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolvingComplaintsComponent } from './solving-complaints.component';

describe('SolvingComplaintsComponent', () => {
  let component: SolvingComplaintsComponent;
  let fixture: ComponentFixture<SolvingComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolvingComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolvingComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
