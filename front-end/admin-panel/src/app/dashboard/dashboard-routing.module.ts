import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../core/service/auth-guard.service';
import { AddHrComponent } from './associates/components/add-hr/add-hr.component';
import { EditHrComponent } from './associates/components/edit-hr/edit-hr.component';
import { FileUploadComponent } from './associates/components/file-upload/file-upload.component';
import { HrListingComponent } from './associates/components/hr-listing/hr-listing.component';
import { ViewHrComponent } from './associates/components/view-hr/view-hr.component';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,

    children: [

      {
        path:'hr',
        component: HrListingComponent,

      },
      {
        path:'add',
        component: AddHrComponent,

      },
      {
        path:'edit',
        component: EditHrComponent,

      },
      {
        path:'view',
        component: ViewHrComponent,

      },
      // {
      //   path:'associates/:id/view',
      //   component: AssociateViewComponent,

      //   resolve: {
      //     associate: EditAssociateResolveService
      //   }
      // },
      // {
      //   path:'associates/:id',
      //   component: AssociateFormComponent,

      // },
      {
        path:'upload',
        component: FileUploadComponent,

      },

      // {
      //   path:'clients',
      //   component: OthersListingComponent,

      // },

      {
        path:'**',
        redirectTo: "associates",

      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
