import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodChoiceSelectComponent } from './food-choice-select.component';

describe('FoodChoiceSelectComponent', () => {
  let component: FoodChoiceSelectComponent;
  let fixture: ComponentFixture<FoodChoiceSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FoodChoiceSelectComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodChoiceSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
