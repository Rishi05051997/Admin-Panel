import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { JwtService } from './service/jwt.service';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { AuthGuardService } from './service/auth-guard.service';
import { NoAuthGuardService } from './service/no-auth-guard.service';
import { AuthService } from './auth/auth.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,

  ],
  providers:[ JwtService, HttpInterceptorService, AuthGuardService, NoAuthGuardService, AuthService]
})
export class CoreModule { }
