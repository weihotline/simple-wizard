/**
 * `Item` represents a simple form of item that can be displayed for selection
 */
export class Item {
  /**
   * `key` - item unique identifier
   */
  key: string;
  /**
   * `displayName` - item display name
   */
  displayName: string;

  constructor(options?: Object) {
    this.key = options && options['key'] || '';
    this.displayName = options && options['displayName'] || '';
  }

}
