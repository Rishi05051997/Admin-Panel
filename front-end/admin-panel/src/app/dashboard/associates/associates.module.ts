import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AssociateService } from './services/associate.service';
import { RouterModule } from '@angular/router';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { NgxPaginationModule } from 'ngx-pagination'
import { HrListingComponent } from './components/hr-listing/hr-listing.component';
import { AddHrComponent } from './components/add-hr/add-hr.component';
import { EditHrComponent } from './components/edit-hr/edit-hr.component';
import { ViewHrComponent } from './components/view-hr/view-hr.component';
import { HrServiceService } from './components/share/hr-service.service';



@NgModule({
  declarations: [ FileUploadComponent,  HrListingComponent, AddHrComponent, EditHrComponent, ViewHrComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  exports: [

    FileUploadComponent,

  ],
  providers: [AssociateService, HrServiceService],
})
export class AssociatesModule { }
