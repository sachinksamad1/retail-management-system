import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierManagementComponent } from './supplier-management.component';

describe('SupplierManagementComponent', () => {
  let component: SupplierManagementComponent;
  let fixture: ComponentFixture<SupplierManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
