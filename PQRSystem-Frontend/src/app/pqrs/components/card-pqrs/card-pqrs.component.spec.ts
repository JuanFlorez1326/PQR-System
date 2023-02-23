import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPqrsComponent } from './card-pqrs.component';

describe('CardPqrsComponent', () => {
  let component: CardPqrsComponent;
  let fixture: ComponentFixture<CardPqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPqrsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
