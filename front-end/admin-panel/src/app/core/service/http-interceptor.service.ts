import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService  implements HttpInterceptor {

  constructor(
    private jwtService: JwtService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const headerConfig:any = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    // debugger;
    const token = this.jwtService.getToken();
    if(token){
      headerConfig['Authorization'] = `bearer ${token}`

    }
    const _req = req.clone({setHeaders: headerConfig});
    return next.handle(_req);
  }
}
