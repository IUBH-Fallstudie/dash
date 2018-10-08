import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import {
  MatButtonModule,
  MatCardModule, MatExpansionModule,
  MatInputModule, MatListModule,
  MatProgressBarModule,
  MatToolbarModule
} from "@angular/material";
import {FormsModule} from "@angular/forms";
import { SemesterTableComponent } from './dashboard/semester-table/semester-table.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ToolbarComponent,
    SemesterTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
