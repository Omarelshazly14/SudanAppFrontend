import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPermissionComponent } from './my-permission.component';

describe('MyPermissionComponent', () => {
  let component: MyPermissionComponent;
  let fixture: ComponentFixture<MyPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
