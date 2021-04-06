import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
    path:'',
    component: AppComponent
  },
  {path:'dashboard', 
  loadChildren: () => import('../app/dashboard/dashboard.module').then(m => m.DashboardModule)
},{
  path:'**',
  redirectTo:'associate-builder'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
