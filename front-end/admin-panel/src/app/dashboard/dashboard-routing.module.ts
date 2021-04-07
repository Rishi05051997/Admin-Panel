import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociatesListingComponent } from './associates/components/associates-listing/associates-listing.component';

import { MainContentComponent } from './components/main-content/main-content.component';
import { DashboardComponent } from './dashboard.component';
import { OthersListingComponent } from './others/components/others-listing/others-listing.component';

const routes: Routes = [
  {
    path:'', 
    component:DashboardComponent,
    children: [
      {
        path:'',
        component: MainContentComponent
      },
      {
        path:'associates',
        component: AssociatesListingComponent
      },
      {
        path:'clients',
        component: OthersListingComponent
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }