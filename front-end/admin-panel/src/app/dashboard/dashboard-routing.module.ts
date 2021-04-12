import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociateFormComponent } from './associates/components/associate-form/associate-form.component';
import { AssociateViewComponent } from './associates/components/associate-view/associate-view.component';
import { AssociatesListingComponent } from './associates/components/associates-listing/associates-listing.component';
import { EditAssociateResolveService } from './associates/services/edit-associate-resolve.service';
import { DashboardComponent } from './dashboard.component';
import { OthersListingComponent } from './others/components/others-listing/others-listing.component';

const routes: Routes = [
  {
    path:'', 
    component:DashboardComponent,
    children: [
      
      {
        path:'associates',
        component: AssociatesListingComponent
      },
      {
        path:'associates/new',
        component: AssociateFormComponent
      },
      {
        path:'associates/:id/view',
        component: AssociateViewComponent,
        resolve: {
          associate: EditAssociateResolveService
        }
      },
      {
        path:'associates/:id',
        component: AssociateFormComponent
      },
      {
        path:'clients',
        component: OthersListingComponent
      },
      {
        path:'**',
        redirectTo: "associates"
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
