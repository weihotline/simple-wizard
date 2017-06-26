import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { FoodWizardComponent } from './food-wizard.component';
import { FoodService } from '../services';

describe('FoodChoiceWizardComponent', () => {
  let component: FoodWizardComponent;
  let fixture: ComponentFixture<FoodWizardComponent>;
  let foodServiceSpy;
  let foodStoreSpy;

  beforeEach(() => {
    foodServiceSpy = jasmine.createSpyObj('FoodService', [
      'getOptionsBasedOnKey',
      'getTypeOptions'
    ]);
    foodServiceSpy.getTypeOptions.and.returnValue(Observable.of([]));

    foodStoreSpy = jasmine.createSpyObj('Store', [
      'select',
      'dispatch'
    ]);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FoodWizardComponent
      ],
      providers: [
        { provide: FoodService, useValue: foodServiceSpy },
        { provide: Store, useValue: foodStoreSpy }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
