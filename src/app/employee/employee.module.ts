// import { NgModule } from '@angular/core';
// import{ReactiveFormsModule} from '@angular/forms';
// import {EmployeeRoutingModule} from './employee-routing.module';
// import { CommonModule } from '@angular/common';
// import { CreateEmployeeComponent } from './create-employee.component';
// import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';

import { EmployeeRoutingModule } from './employee-routing.module';

import { CreateEmployeeComponent } from './create-employee.component';
 import { ListEmployeeComponent } from './list-employee.component';

import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    CreateEmployeeComponent,
    ListEmployeeComponent,
  ],
  imports: [
    // CommonModule,
    // ReactiveFormsModule,
    EmployeeRoutingModule,
    SharedModule
  ],
  exports:[CreateEmployeeComponent]
})
export class EmployeeModule { }
