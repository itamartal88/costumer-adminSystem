import { AppService } from './../app/app.service';

import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter,catchError } from 'rxjs/operators';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
constructor(public tokenService:AppService) { 
}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

 var authReq = req.clone({ headers: req.headers.set("authorization", this.tokenService.token)});
 
return next.handle(authReq)
 .pipe(
  catchError((error, caught) => {
  console.log("Error Occurred");
  console.log(error);
   return Observable.throw(error);
   }) as any)
 }
}

