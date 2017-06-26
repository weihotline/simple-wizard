import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { FormWizardModule } from 'angular2-wizard';

import { FoodWizardComponent } from './food-wizard.component';
import { FoodChoiceSelectComponent } from './food-choice-select/food-choice-select.component';
import { FoodTypeSelectComponent } from './food-type-select/food-type-select.component';
import { FoodService } from '../services';
import { wishlistReducer } from '../stores';

@NgModule({
  declarations: [
    FoodWizardComponent,
    FoodChoiceSelectComponent,
    FoodTypeSelectComponent
  ],
  imports: [
    CommonModule,
    AngularDualListBoxModule,
    FormWizardModule,
    StoreModule.provideStore({ wishlist: wishlistReducer })
  ],
  exports: [
    FoodWizardComponent
  ],
  providers: [
    FoodService
  ],
})
export class FoodWizardModule { }
