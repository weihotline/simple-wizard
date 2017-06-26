import { Component, Input, OnInit } from '@angular/core';

import { Item } from '../../models';

@Component({
  selector: 'app-food-choice-select',
  templateUrl: './food-choice-select.component.html',
  styleUrls: ['./food-choice-select.component.css']
})
export class FoodChoiceSelectComponent implements OnInit {
  /**
   * `source` - datasource that is used for dual-list to display
   */
  @Input() source: Array<Item> = [];
  /**
   * `destination` - target stations for a list of selected choices
   */
  @Input() destination: Array<Item> = [];
  /**
   * `key` - unique identifer for datasource items
   */
  key: string;
  /**
   * `display` - used as display name for datasource items
   */
  display: string;

  constructor() {
  }

  ngOnInit() {
    this.key = 'key';
    this.display = 'displayName';
  }

}
