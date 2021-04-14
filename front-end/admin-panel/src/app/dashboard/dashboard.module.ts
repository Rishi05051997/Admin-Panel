import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from '../shared/material/material.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AssociatesModule } from './associates/associates.module';
import { OthersModule } from './others/others.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditAssociateResolveService } from './associates/services/edit-associate-resolve.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../core/service/http-interceptor.service';



@NgModule({
  declarations: [DashboardComponent, SideNavComponent, ToolbarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    AssociatesModule,
    OthersModule,
    ReactiveFormsModule
  ],
  providers:[EditAssociateResolveService,
  {
    provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true
  }
  ]
})
export class DashboardModule { }
