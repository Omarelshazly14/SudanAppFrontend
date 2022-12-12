import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSidbarComponent } from './main-sidbar.component';

describe('MainSidbarComponent', () => {
  let component: MainSidbarComponent;
  let fixture: ComponentFixture<MainSidbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSidbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSidbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
