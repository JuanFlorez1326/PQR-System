import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPqrsComponent } from './all-pqrs.component';

describe('AllPqrsComponent', () => {
  let component: AllPqrsComponent;
  let fixture: ComponentFixture<AllPqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPqrsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
