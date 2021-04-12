import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssociatesListingComponent } from './components/associates-listing/associates-listing.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AssociateService } from './services/associate.service';
import { AssociateFormComponent } from './components/associate-form/associate-form.component';
import { AssociateViewComponent } from './components/associate-view/associate-view.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AssociatesListingComponent, AssociateFormComponent, AssociateViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    AssociatesListingComponent,
    AssociateFormComponent
  ],
  providers: [AssociateService],
})
export class AssociatesModule { }
