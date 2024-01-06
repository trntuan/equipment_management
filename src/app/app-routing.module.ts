import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesDashboardComponent } from './components/devices-dashboard/devices-dashboard.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'devices',
    component: DevicesDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: EmployeeDashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
