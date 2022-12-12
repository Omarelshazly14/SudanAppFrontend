import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySwapComponent } from './my-swap.component';

describe('MySwapComponent', () => {
  let component: MySwapComponent;
  let fixture: ComponentFixture<MySwapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySwapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
