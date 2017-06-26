import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTypeSelectComponent } from './food-type-select.component';

describe('FoodTypeSelectComponent', () => {
  let component: FoodTypeSelectComponent;
  let fixture: ComponentFixture<FoodTypeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodTypeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
