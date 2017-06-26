import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { FoodWizardModule } from './food-wizard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FoodWizardModule
  ],
  providers: [ ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
