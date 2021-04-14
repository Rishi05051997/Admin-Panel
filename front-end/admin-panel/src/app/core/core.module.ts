import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { JwtService } from './service/jwt.service';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { AuthGuardService } from './service/auth-guard.service';
import { NoAuthGuardService } from './service/no-auth-guard.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[AuthService, JwtService, HttpInterceptorService, AuthGuardService, NoAuthGuardService]
})
export class CoreModule { }
