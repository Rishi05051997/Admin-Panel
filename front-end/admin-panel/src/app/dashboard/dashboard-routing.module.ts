import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../core/service/auth-guard.service';
import { AddUserComponent } from './users/components/add-user/add-user.component';
import { EditUserComponent } from './users/components/edit-user/edit-user.component';
import { FileUploadComponent } from './users/components/file-upload/file-upload.component';
import { UsersListingComponent } from './users/components/users-listing/users-listing.component';
import { ViewUserComponent } from './users/components/view-user/view-user.component';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    canActivate: [AuthGuardService],

    children: [

      {
        path:'hr',
        component: UsersListingComponent,
        canActivateChild: [AuthGuardService],

      },
      {
        path:'add',
        component: AddUserComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path:'edit/:id',
        component: EditUserComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path:'view/:id',
        component: ViewUserComponent,
        canActivateChild: [AuthGuardService],
      },

      {
        path:'upload',
        component: FileUploadComponent,
        canActivateChild: [AuthGuardService],
      },


      {
        path:'**',
        redirectTo: "hr",
        canActivateChild: [AuthGuardService],
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
