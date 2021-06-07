import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';

const routes: Routes = [
  {
    path: "employees", 
    component: EmployeeListComponent
  },
  {
    path: "add-employee", 
    component: CreateEmployeeComponent,
  },
  {
    path: "update-employee/:id",
    component: UpdateEmployeeComponent
  },
  {
    path: "employee-detail/:id",
    component: EmployeeDetailComponent
  },
  { 
    path: "**", 
    redirectTo: "employees",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
