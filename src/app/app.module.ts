import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './login/login.component';
import {ToolbarComponent} from './shared/toolbar/toolbar.component';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSliderModule, MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule} from "@angular/forms";
import {SemesterTableComponent} from './dashboard/tor/semester-table/semester-table.component';
import {TorComponent} from './dashboard/tor/tor.component';
import {ModuleDetailComponent} from './dashboard/tor/module-detail/module-detail.component';
import {OverviewComponent} from './dashboard/overview/overview.component';
import {CoursesComponent, SearchCoursesFilter} from './dashboard/courses/courses.component';
import {MoodleCoursesComponent} from './dashboard/overview/moodle-courses/moodle-courses.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {BasicStatsComponent} from './dashboard/overview/basic-stats/basic-stats.component';
import {LinksComponent} from './dashboard/links/links.component';
import {CalendarComponent} from './dashboard/overview/calendar/calendar.component';

import localeDe from '@angular/common/locales/de';
import {registerLocaleData} from "@angular/common";
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {LoaderComponent} from './dashboard/tor/module-detail/loader/loader.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { MoodleLinkDirective } from './moodle-link/moodle-link.directive';
import { MoodleLinkDialogComponent } from './moodle-link/moodle-link-dialog.component';

registerLocaleData(localeDe, 'de');


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    LoaderComponent,
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
    CalendarComponent,
    SafeUrlPipe,
    MoodleLinkDirective,
    MoodleLinkDialogComponent,
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
    MatDialogModule,
    MatInputModule,
    MatSliderModule,
    MatProgressBarModule,
    MatCardModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatTabsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de'},
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModuleDetailComponent, MoodleLinkDialogComponent],
})
export class AppModule {
}
