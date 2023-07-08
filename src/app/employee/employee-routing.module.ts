import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from '@angular/router';
import { ListEmployeeComponent } from './list-employee.component';
import { CreateEmployeeComponent } from './create-employee.component';

const appRoutes: Routes = [
  {
    path: 'employees',
    children: [
      { path: '', component: ListEmployeeComponent },
      { path: 'create', component: CreateEmployeeComponent },
      { path: 'edit/:id', component: CreateEmployeeComponent },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
