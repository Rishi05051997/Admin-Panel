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
import { EditAssociateResolveService } from './services/edit-associate-resolve.service';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { SearchfilterPipe } from '../pipe/searchfilter.pipe';
import { AddComponent } from './components/file-upload/add/add.component';
import { EditComponent } from './components/file-upload/edit/edit.component';
import { NgxPaginationModule } from 'ngx-pagination'


@NgModule({
  declarations: [AssociatesListingComponent, AssociateFormComponent, AssociateViewComponent, FileUploadComponent, SearchfilterPipe, AddComponent, EditComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule
  ],
  exports: [
    AssociatesListingComponent,
    AssociateFormComponent,
    FileUploadComponent,
    SearchfilterPipe
  ],
  providers: [AssociateService],
})
export class AssociatesModule { }
