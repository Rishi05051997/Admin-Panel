import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { MaterialModule } from '../shared/material/material.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UsersModule } from './users/users.module';
// import { OthersModule } from './others/others.module';
import { ReactiveFormsModule } from '@angular/forms';
// import { EditAssociateResolveService } from './users/services/edit-associate-resolve.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../core/service/http-interceptor.service';
import { AuthGuardService } from '../core/service/auth-guard.service';





@NgModule({
  declarations: [DashboardComponent, SideNavComponent, ToolbarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    UsersModule,
    ReactiveFormsModule,


  ],
  providers:[ AuthGuardService,
  {
    provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true
  }
  ],

})
export class DashboardModule { }
