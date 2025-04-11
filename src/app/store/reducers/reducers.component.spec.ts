import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReducersComponent } from './reducers.component';

describe('ReducersComponent', () => {
  let component: ReducersComponent;
  let fixture: ComponentFixture<ReducersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReducersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReducersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
