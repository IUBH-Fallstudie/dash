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
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule, MatExpansionModule, MatIconModule,
  MatInputModule, MatListModule,
  MatProgressBarModule, MatRippleModule, MatSliderModule, MatTableModule, MatTabsModule,
  MatToolbarModule
} from "@angular/material";
import {FormsModule} from "@angular/forms";
import { SemesterTableComponent } from './dashboard/tor/semester-table/semester-table.component';
import { TorComponent } from './dashboard/tor/tor.component';
import { ModuleDetailComponent } from './dashboard/tor/module-detail/module-detail.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import {CoursesComponent, SearchCoursesFilter} from './dashboard/courses/courses.component';
import { MoodleCoursesComponent } from './dashboard/overview/moodle-courses/moodle-courses.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import { BasicStatsComponent } from './dashboard/overview/basic-stats/basic-stats.component';
import { LinksComponent } from './dashboard/links/links.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ToolbarComponent,
    SemesterTableComponent,
    TorComponent,
    ModuleDetailComponent,
    OverviewComponent,
    CoursesComponent,
    MoodleCoursesComponent,
    SearchCoursesFilter,
    BasicStatsComponent,
    LinksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScrollingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatProgressBarModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModuleDetailComponent],
})
export class AppModule { }
