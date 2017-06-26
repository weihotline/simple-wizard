import { Item } from './item';

describe('Item', () => {
  it('should create an instance', () => {
    const item = new Item({
      key: 'fruits',
      displayName: 'Fruits'
    });

    expect(item).toBeTruthy();
    expect(item.key).toEqual('fruits');
    expect(item.displayName).toEqual('Fruits');
  });

});
