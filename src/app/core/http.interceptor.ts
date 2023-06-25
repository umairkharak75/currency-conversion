import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';

@Injectable()
export class HttpCallInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<never>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Modify the request as needed
    const modifiedRequest = request.clone({
      url:environment.apiUrl+request.url,
      setHeaders: {
        'Content-Type': 'application/json',
        'apikey':environment.apiKey
      },
    });

    // Forward the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}
