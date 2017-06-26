import { NgModule } from '@angular/core';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { MockService } from './mock.service';

/**
 * `mockBackendHttpFactory` is used as the Provider for the Http token for unit testings
 *
 * ### Example
 * ```javascript
 *  {
 *    provide: Http,
 *    useFactory: mockBackendHttpFactory,
 *    deps: [ MockBackend, BaseRequestOptions ]
 *  }
 * ```
 *
 * @function mockBackendHttpFactory
 */
export function mockBackendHttpFactory(backend: MockBackend, options: BaseRequestOptions): Http {
  return new Http(backend, options);
};

/**
 * `MockServiceModule` captures all providers needed for TestBed configuration.
 * @module
 */
@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    MockService,
    MockBackend,
    BaseRequestOptions,
    {
      provide: Http,
      useFactory: mockBackendHttpFactory,
      deps: [ MockBackend, BaseRequestOptions ]
    }
  ]
})
export class MockServiceModule { }
