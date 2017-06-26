import { async, TestBed, inject } from '@angular/core/testing';

import { MockServiceModule } from './mock-service.module';
import { FoodService } from './food.service';
import { MockService } from './mock.service';

describe('FoodService', () => {
  const sampleFoodServiceResponseForTest = {
    'fruits': [
      {
        'key': 'apple',
        'displayName': 'Apple'
      },
      {
        'key': 'mango',
        'displayName': 'Mango'
      },
      {
        'key': 'pear',
        'displayName': 'Pear'
      }
    ]
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MockServiceModule
      ],
      providers: [
        FoodService
      ]
    });
  });

  it('should be created', inject([FoodService], (service: FoodService) => {
    expect(service).toBeTruthy();
  }));

  describe('with successful http request', () => {
    it('should return status code 200',
      async(inject([FoodService, MockService], (service: FoodService, mockService: MockService) => {
        mockService.setupConnections({
          url: `${FoodService.BASE_URI}/foods.json`,
          status: 200,
          body: sampleFoodServiceResponseForTest
        });

        service.getOptionsBasedOnKey('fruits').subscribe((data: Object) => {
          expect(data).toEqual(sampleFoodServiceResponseForTest['fruits']);
        });
      }))
    );
  });

  describe('with http request failure', () => {
    it('should throw a ErrorObservable with a message "Server Error"',
      async(inject([FoodService, MockService], (service: FoodService, mockService: MockService) => {
        mockService.setupConnections({
          url: `${FoodService.BASE_URI}/foods.json`,
          status: 404
        });

        expect(() => { service.getOptionsBasedOnKey('fruits').subscribe(); }).toThrow('Server Error');
      }))
    );
  });

});
