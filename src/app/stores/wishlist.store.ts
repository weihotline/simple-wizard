import { ActionReducer, Action } from '@ngrx/store';

/**
 * `wishlistReducer` combines json payload from different components in wizard.
 * @param wishlist - the central Redux store that contains the json payload
 * @param action - the action that receives from dispatcher
 */
export function wishlistReducer(wishlist: Object = {}, action: Action): Object {
  return Object.assign(wishlist, action.payload);
}

/**
 * `WishlistStoreState` define a wishlist that can be selected from the ngrx store
 */
export interface WishlistStoreState {
  wishlist: Object;
}
