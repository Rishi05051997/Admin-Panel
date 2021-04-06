import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssociatesListingComponent } from './components/associates-listing/associates-listing.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AssociatesListingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    AssociatesListingComponent
  ]
})
export class AssociatesModule { }
