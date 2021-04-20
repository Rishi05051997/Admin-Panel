import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from './shared/material/material.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule,
    CoreModule,
    ToastrModule.forRoot(),
    
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
