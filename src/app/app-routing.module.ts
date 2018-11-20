import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./login/auth.guard";
import { OverviewComponent } from "./dashboard/overview/overview.component";
import { TorComponent } from "./dashboard/tor/tor.component";
import { LinksComponent } from "./dashboard/links/links.component";

const routes: Routes = [
  {path: 'auth', component: LoginComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: ':tab', component: DashboardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
