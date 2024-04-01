import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class MockHttpErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }

  urlToFail = '/categories';

  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
    const { url, method } = req;

    if (url.includes(this.urlToFail) && method === 'DELETE') {
      const errorResponse = new HttpErrorResponse({
        error: `Error: Request to ${this.urlToFail} is not allowed`,
        status: 500,
        statusText: 'Internal Server Error'
      });

      return throwError(() => errorResponse);
    }
    // if there is not any matches return default request.
    return next.handle(req);
  }
}
