import { wishlistReducer } from './wishlist.store';

describe('WishlistStore', () => {

  describe('`wishlistReducer`', () => {
    it('should merge action.payload into the wishlist store', () => {
      expect(wishlistReducer({ key: 'key' }, {
        type: 'mock',
        payload: {
          value: 'test'
        }
      })).toEqual({ key: 'key', value: 'test' });
    });
  })

});
