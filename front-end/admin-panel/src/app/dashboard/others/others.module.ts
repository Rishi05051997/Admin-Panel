import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OthersListingComponent } from './components/others-listing/others-listing.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [OthersListingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ]
})
export class OthersModule { }
