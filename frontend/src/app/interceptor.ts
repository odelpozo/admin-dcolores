
import { Injectable } from '@angular/core'; 
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
    HttpHandler,
    HttpEvent
  } from '@angular/common/http';
  
  import { Observable } from 'rxjs/Observable';
  import { tap, catchError } from 'rxjs/operators';
  import { throwError } from "rxjs";
  
  @Injectable()
  export class Interceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        let fakeToken = '';
        if(localStorage.getItem('currentUser') !== null){
            fakeToken = JSON.parse(localStorage.currentUser).perfil;
        }

        const clonedRequest = request.clone({
            setHeaders : {
                'Authorization': fakeToken
            }
        });
    
      return next.handle(clonedRequest).pipe(tap((ev: HttpEvent<any>) => { 
        if (ev instanceof HttpResponse) {
         //  console.log('processing interceptor response', ev);
        }      
      }),
      catchError(response => {
          if (response instanceof HttpErrorResponse) {
            console.log('Processing interceptor http error', response.error);
           }
           return throwError(response);	
         }))
    }
  }
