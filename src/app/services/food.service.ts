import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Item } from '../models';

/**
 * `FoodService` communicates with a local json to fetch a list of available food options
 */
@Injectable()
export class FoodService {
  /**
   * `FoodService.BASE_URI` contains the base path of the local json
   */
  static readonly BASE_URI = `${environment.production ? '.' : './assets/json'}`;

  /**
   * @param http - injected http instance for making http call
   */
  constructor(private http: Http) { }

  /**
   * `getOptionsBasedOnKey` fetch a list of available food choices based on the type of food being selected
   * @param key - food type key
   */
  getOptionsBasedOnKey(key: string): Observable<any> {
    return this.http.get(`${FoodService.BASE_URI}/foods.json`)
      .map((res: Response) => res.json()[key])
      .catch((err: any) => Observable.throw('Server Error'));
  }

  /**
   * `getTypeOptions` provides a list of available food types for selection.
   * this can be moved to a service call or a local json
   */
  getTypeOptions(): Observable<any> {
    return Observable.of([
      new Item({ displayName: 'Fruits', key: 'fruits' }),
      new Item({ displayName: 'Vegetables', key: 'vegetables' }),
      new Item({ displayName: 'Meats', key: 'meats' })
    ]);
  }

}
