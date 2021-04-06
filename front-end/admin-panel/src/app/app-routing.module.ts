import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AssociateBuilderComponent } from './associate-builder/associate-builder.component';

const routes: Routes = [
  {
    path:'',
    component: AppComponent
  },
  {path:'associate-builder', 
  loadChildren: () => import('../app/associate-builder/associate-builder.module').then(m => m.AssociateBuilderModule)
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
