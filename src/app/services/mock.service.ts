import { Injectable } from '@angular/core';
import { Http, Response, ResponseOptions, BaseRequestOptions, Headers } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';

/**
 * `MockService` provides a facade that hides the complex
 * MockBackend and MockConnection test setup.
 */
@Injectable()
export class MockService {
  /**
   * `MockService.MOCK_URL` is used only for inhouse testing
   */
  private static readonly MOCK_URL = '/api/mock';

  /**
   * `urlToResponse` has url as the key and {Response} as the value
   * ### Example
   * ```javascript
   *     {
   *       'api/employers': Response{
   *          _body: [...],
   *          status: 200,
   *          ok: true,
   *          statusText: null,
   *          headers: Headers{_headers: ..., _normalizedNames: ...},
   *          type: null,
   *          url: '/api/employers'}
   *     }
   * ```
   */
  private urlToResponse: Object;

  constructor(
    private http: Http,
    private mockBackend: MockBackend) { }

  /**
   * This method is used to set up MockConnection with endpoints and their responses.
   *
   * ### Example
   * ```ts
   *     mockService.setupConnections([
   *       {
   *         url: `${MockService.MOCK_URL}/notfound`,
   *         status: 404
   *       },
   *       {
   *         url: MockService.MOCK_URL,
   *         status: 200,
   *         body: { id: 1, title: 'mock" }
   *       }
   *     ]);
   * ```
   *
   * @param options - single or multiple endpoint options
   */
  setupConnections(options: Object | Array<Object>): Subscription {
    this.urlToResponse = this.handleMultipleEndpoints(options);

    return this.mockBackend.connections.subscribe((connection: MockConnection) => {
      const response = this.resolveUrlIntoResponse(connection.request.url);
      (response instanceof ErrorResponse) ? connection.mockError(response) : connection.mockRespond(response);
    });
  }

  /**
   * This method is used for test MockDataService only.
   * The MockService.MOCK_URL endpoint does not actually exist.
   */
  private getSampleTestData(): Observable<any> {
    return this.http.get(MockService.MOCK_URL)
                    .map((res: Response) => res.json());
  }

  /**
   * This method is used for test MockDataService only.
   * The MockService.MOCK_URL endpoint does not actually exist.
   */
  private getSampleTestDataWithCatch(): Observable<any> {
    return this.getSampleTestData()
               .catch((err) => Observable.of([]));
  }

  /**
   * This method is used to handle single or multiple endpoints setup.
   * @param options - single or multiple endpoint options
   */
  private handleMultipleEndpoints(options: Object | Array<Object>): Object {
    const modifiedOptions = Array.isArray(options) ? options : [options];
    const urlToResponse: Object = {};

    for (const opt of modifiedOptions) {
      if (opt['url']) {
        urlToResponse[opt['url']] = this.getMockResponse(opt);
      } else {
        throw new Error(`${JSON.stringify(opt)} url is undefined`);
      }
    }

    return urlToResponse;
  }

  /**
   * This method is used to find out the corresponding Response of an URL.
   * For an undefined URL, a 404 is returned.
   * @param url - provided url for Response lookup
   */
  private resolveUrlIntoResponse(url: string): Response {
    if (this.urlToResponse && this.urlToResponse[url]) {
      return this.urlToResponse[url];
    } else {
      return this.getMockResponse({
        url: url,
        status: 404,
        body: `The requested URL ${url} was not found on this server.`
      });
    }
  }

  /**
   * This method is to take response options and build a Response
   * @param options - single endpoint response options
   */
  private getMockResponse(options: Object): Response {
    const responseOptions = new ResponseOptions({
      url: options && options['url'] || '',
      status: options && options['status'] || 404,
      body: options && options['body'] || '',
      headers: new Headers(options && options['headers'] || {})
    });
    const response = new Response(responseOptions);

    return response.ok ? response : new ErrorResponse(responseOptions);
  }
}

/**
 * `ErrorResponse` class solves the problem of which
 * MockConnection.MockError only accepts an Error instance.
 *
 * https://github.com/angular/angular/pull/8961
 */
class ErrorResponse extends Response implements Error {
  name: string;
  message: string;
}
