import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociateBuilderComponent } from './associate-builder.component';
import { MainContentComponent } from './components/main-content/main-content.component';

const routes: Routes = [
  {
    path:'', 
    component:AssociateBuilderComponent,
    children: [
      {
        path:'',
        component: MainContentComponent
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociateBuilderRoutingModule { }
