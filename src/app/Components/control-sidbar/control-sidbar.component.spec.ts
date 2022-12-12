import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlSidbarComponent } from './control-sidbar.component';

describe('ControlSidbarComponent', () => {
  let component: ControlSidbarComponent;
  let fixture: ComponentFixture<ControlSidbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlSidbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlSidbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
