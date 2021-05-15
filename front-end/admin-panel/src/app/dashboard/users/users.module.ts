import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { NgxPaginationModule } from 'ngx-pagination'
import { UsersListingComponent } from './components/users-listing/users-listing.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { UsersServiceService } from './components/share/users-service.service';



@NgModule({
  declarations: [ FileUploadComponent,  UsersListingComponent, AddUserComponent, EditUserComponent, ViewUserComponent],
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
  providers: [UsersServiceService],
})
export class UsersModule { }
