import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { NoAuthGuardService } from './core/service/no-auth-guard.service';


const routes: Routes = 
[
  {
    path:'',
    component: AuthComponent
  },
  {
    path:'login',
    component: AuthComponent,
    canActivate: [NoAuthGuardService]

  },
  {
    path:'signup',
    component: AuthComponent,
    canActivate: [NoAuthGuardService]
  },

  {
    path:'dashboard', 
    loadChildren: () => import('../app/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path:'**',
    redirectTo:'associate-builder'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
