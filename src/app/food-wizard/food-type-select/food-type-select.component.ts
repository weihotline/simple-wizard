import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Item } from '../../models';

@Component({
  selector: 'app-food-type-select',
  templateUrl: './food-type-select.component.html',
  styleUrls: ['./food-type-select.component.css']
})
export class FoodTypeSelectComponent implements OnInit {
  /**
   * `foodTypes` - accepts a list of food types to choose from
   */
  @Input() foodTypes: Item[];
  /**
   * `onFoodTypeSelected` - used to emit the key of the food type when a food type is selected
   */
  @Output() onFoodTypeSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  /**
   * `onChange` emits the key of the food type being selected
   */
  onChange(key: string) {
    this.onFoodTypeSelected.emit(key);
  }

  /**
   * `trackByFoodTypes` - help angular tracking food type options
   * @param index - position of the option item
   * @param item - object associated with the option
   */
  trackByFoodTypes(index: number, item: Item): string {
    return item.key;
  }

}
