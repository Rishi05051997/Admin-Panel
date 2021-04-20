import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../core/service/auth-guard.service';
import { AssociateFormComponent } from './associates/components/associate-form/associate-form.component';
import { AssociateViewComponent } from './associates/components/associate-view/associate-view.component';
import { AssociatesListingComponent } from './associates/components/associates-listing/associates-listing.component';
import { AddComponent } from './associates/components/file-upload/add/add.component';
import { EditComponent } from './associates/components/file-upload/edit/edit.component';
import { FileUploadComponent } from './associates/components/file-upload/file-upload.component';
import { EditAssociateResolveService } from './associates/services/edit-associate-resolve.service';
import { DashboardComponent } from './dashboard.component';
import { OthersListingComponent } from './others/components/others-listing/others-listing.component';

const routes: Routes = [
  {
    path:'', 
    component:DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      
      {
        path:'associates',
        component: AssociatesListingComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path:'associates/new',
        component: AssociateFormComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path:'associates/:id/view',
        component: AssociateViewComponent,
        canActivateChild: [AuthGuardService],
        resolve: {
          associate: EditAssociateResolveService
        }
      },
      {
        path:'associates/:id',
        component: AssociateFormComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path:'upload',
        component: FileUploadComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path:'upload/add',
        component: AddComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path:'upload/edit/:id',
        component: EditComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path:'clients',
        component: OthersListingComponent,
        canActivateChild: [AuthGuardService]
      },

      {
        path:'**',
        redirectTo: "associates",
        canActivateChild: [AuthGuardService]
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
