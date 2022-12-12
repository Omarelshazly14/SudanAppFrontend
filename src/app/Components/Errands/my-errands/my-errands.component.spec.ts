import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyErrandsComponent } from './my-errands.component';

describe('MyErrandsComponent', () => {
  let component: MyErrandsComponent;
  let fixture: ComponentFixture<MyErrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyErrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyErrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
