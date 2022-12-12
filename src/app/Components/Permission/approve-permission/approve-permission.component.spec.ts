import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePermissionComponent } from './approve-permission.component';

describe('ApprovePermissionComponent', () => {
  let component: ApprovePermissionComponent;
  let fixture: ComponentFixture<ApprovePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovePermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
