import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import {CardModule} from "primeng/card";
import {TableModule} from "primeng/table";
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import {CreateEmployeeComponent} from "./components/create-employee/create-employee.component";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {RippleModule} from "primeng/ripple";
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {ProgressSpinnerModule} from "primeng/progressspinner";


@NgModule({
  declarations: [
    AppComponent,
    EditEmployeeComponent,
    ListEmployeeComponent,
    CreateEmployeeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    TableModule,
    InputTextModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    RippleModule,
    HttpClientModule,
    ProgressSpinnerModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
