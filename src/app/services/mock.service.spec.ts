import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { MockService } from './mock.service';
import { MockServiceModule } from './mock-service.module';

describe('MockService', () => {
  const sampleDataForTest: Array<Object> = [
    {
      'id': 1,
      'title': 'mock'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MockServiceModule
      ]
    });
  });

  it('should exist', inject([MockService], (service: MockService) => {
    expect(service).toBeTruthy();
  }));

  describe('`setupConnections`', () => {
    it('should return body with mock data', async(inject([MockService], (service: MockService) => {
      service.setupConnections({
        url: MockService['MOCK_URL'],
        status: 200,
        body: sampleDataForTest
      });

      service['getSampleTestData']().subscribe((data: Array<Object>) => {
        expect(data).toEqual(sampleDataForTest);
      });
    })));

    it('should return a 404 when requested URL was not found and return Observable.of([])',
      async(inject([MockService], (service: MockService) => {
        service.setupConnections({
          url: `${MockService['MOCK_URL']}/notfound`,
          status: 404
        });

        service['getSampleTestDataWithCatch']().subscribe((data: Array<Object>) => {
          expect(data).toEqual([]);
        });
      }))
    );

    it('should handle multiple endpoints setup', async(inject([MockService], (service: MockService) => {
      service.setupConnections([
        {
          url: `${MockService['MOCK_URL']}/notfound`,
          status: 404
        },
        {
          url: MockService['MOCK_URL'],
          status: 200,
          body: sampleDataForTest
        }
      ]);

      service['getSampleTestData']().subscribe((data: Array<Object>) => {
        expect(data).toEqual(sampleDataForTest);
      });
    })));

    it('should throw an Error if url is not specified', async(inject([MockService], (service: MockService) => {
      const opt = { status: 500 };
      expect(() => { service.setupConnections(opt); }).toThrow(new Error(`${JSON.stringify(opt)} url is undefined`));
    })));
  });

});
