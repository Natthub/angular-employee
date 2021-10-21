import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {ListEmployeeComponent} from "./components/list-employee/list-employee.component";
import {EditEmployeeComponent} from "./components/edit-employee/edit-employee.component";
import {CreateEmployeeComponent} from "./components/create-employee/create-employee.component";

const routes: Routes = [
  {path: '', pathMatch: 'full',redirectTo:'list'},
  {path:'list',component:ListEmployeeComponent},
  {path:'create',component:CreateEmployeeComponent},
  {path:'edit/:id',component:EditEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
