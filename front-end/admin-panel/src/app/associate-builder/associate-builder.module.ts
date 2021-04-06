import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssociateBuilderRoutingModule } from './associate-builder-routing.module';
import { AssociateBuilderComponent } from './associate-builder.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [AssociateBuilderComponent, MainContentComponent, SideNavComponent, ToolbarComponent],
  imports: [
    CommonModule,
    AssociateBuilderRoutingModule,
    MaterialModule
  ]
})
export class AssociateBuilderModule { }
