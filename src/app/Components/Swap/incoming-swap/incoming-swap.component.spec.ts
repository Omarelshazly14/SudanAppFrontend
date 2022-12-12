import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingSwapComponent } from './incoming-swap.component';

describe('IncomingSwapComponent', () => {
  let component: IncomingSwapComponent;
  let fixture: ComponentFixture<IncomingSwapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomingSwapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingSwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
