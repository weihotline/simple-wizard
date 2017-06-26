import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Item } from '../models';
import { FoodTypeSelectComponent } from './food-type-select/food-type-select.component';
import { FoodService } from '../services';
import { WishlistStoreState } from '../stores';

/**
 * `FoodWizardComponent` provides guide-through wizard to allow user to choose foods from predefined collection.
 */
@Component({
  selector: 'app-food-wizard',
  templateUrl: './food-wizard.component.html',
  styleUrls: ['./food-wizard.component.css']
})
export class FoodWizardComponent implements OnInit {
  /**
   * `foodTypes` - stores list of food types to choose from
   */
  foodTypes: Array<Item> = [];
  /**
   * `foods` - stores list of foods to choose from based on the food type
   */
  foods: Array<Item> = [];
  /**
   * `foodSelections` - stores confirmed food selections
   */
  foodSelections: Array<Item> = [];
  /**
   * `steps` - stores title and callbacks of each step of a form-wizard
   */
  steps: Array<any> = [];
  /**
   * `isCompleted` - true when the wizard steps are completed
   */
  isCompleted: boolean;
  /**
   * `foodWishlistStream` - used to get the combined list of selectsion the user has chosen
   */
  foodWishlistStream: Observable<any>;

  private foodTypeKey: string;

  constructor(
    private foodService: FoodService,
    private store: Store<WishlistStoreState>) { }

  ngOnInit() {
    this.foodWishlistStream = this.store.select('wishlist');
    this.subscribeGetTypeOptions();

    this.steps = [
      {
        title: 'Step1',
        onNext: this.onNext1.bind(this)
      },
      {
        title: 'Step2',
        onPrev: this.onPrev2.bind(this),
        onComplete: this.onComplete.bind(this)
      }
    ];

    this.markIsCompleted(false);
  }

  setFoodType(key: string) {
    this.foodTypeKey = key;
  }

  private subscribeGetTypeOptions(): Subscription {
    return this.foodService.getTypeOptions().subscribe((data: any) => {
      this.foodTypes = data;
      this.foodTypeKey = this.foodTypes[0] && this.foodTypes[0].key;
    });
  }

  private subscribeGetFoodOptions(): Subscription {
    return this.foodService.getOptionsBasedOnKey(this.foodTypeKey).subscribe((data: any) => {
      this.foods = data;
    });
  }

  private onNext1() {
    this.subscribeGetFoodOptions();
    this.dispatchPayload({ type: this.foodTypeKey });
  }

  private onPrev2() {
    this.foodSelections = [];
  }

  private onComplete() {
    this.markIsCompleted(true);
    this.dispatchPayload({ selections: this.foodSelections });
  }

  private dispatchPayload(payload: any) {
    this.store.dispatch({ type: null, payload: payload });
  }

  private markIsCompleted(status: boolean) {
    this.isCompleted = status;
  }

}
