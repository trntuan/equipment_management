import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesDashboardComponent } from './components/devices-dashboard/devices-dashboard.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '',pathMatch: 'full', redirectTo: 'devices'},  
  {path:'devices',component: DevicesDashboardComponent},
  {path:'users',component:EmployeeDashboardComponent},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
