import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../service/employee.service";
import Swal from "sweetalert2";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  Employees:any = []
  isLoading:boolean = true;

  constructor(
    private router: Router,
    private employeeService:EmployeeService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.employeeService.GetEmployees().subscribe(res => {
      console.log(res)
      this.isLoading = false
      this.Employees = res
    })
  }

  goToAdd($event: any) {
    this.router.navigateByUrl("/create")
  }
  edit(id:any) {
    this.router.navigate(['/edit',id])
  }
  delete(id:any,i:any){
    console.log(id)
      this.employeeService.deleteEmployee(id).subscribe((res)=>{
        this.Employees.splice(i,1)
      })
  }
  getDate(date:any){
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss');
  }

  handleDetailAlert(employee:any,i:any) {

    Swal.fire({
      title: 'Employee Details',
      html:`<div style="text-align: left">
            <hr>
              <div class="row">
                <div class="col-5">
                    <b>Employee Name</b>
                </div>
                <div class="col">
                     ${employee.name}
                </div>
              </div>
              <div class="row">
                <div class="col-5">
                    <b>Designation</b>
                </div>
                <div class="col">
                     ${employee.designation}
                </div>
              </div>
              <div class="row">
                <div class="col-5">
                    <b>Employee Salary</b>
                </div>
                <div class="col">
                     ${employee.salary}
                </div>
              </div>
              <div class="row">
                <div class="col-5">
                    <b>Joining Date</b>
                </div>
                <div class="col">
                     ${this.getDate(employee.dateJoin)}
                </div>
              </div>
            </div>
            `,
      showCancelButton: true,
      confirmButtonText: 'Edit',
      cancelButtonText: 'Back',
    }).then((result) => {

      if (result.isConfirmed) {

        console.log('Edit');
        this.edit(employee.id);

      } else if (result.isDismissed) {

        console.log('Back');

      }
    })

  }

  handleWarningAlert(employee:any,i:any) {

    Swal.fire({
      title: 'Deleting Employee \nWould you like to continue?',
      icon: 'warning',
      html:`<div style="text-align: left">
            <hr>
              <div class="row">
                <div class="col-5">
                    <b>Employee Name</b>
                </div>
                <div class="col">
                     ${employee.name}
                </div>
              </div>
              <div class="row">
                <div class="col-5">
                    <b>Designation</b>
                </div>
                <div class="col">
                     ${employee.designation}
                </div>
              </div>
              <div class="row">
                <div class="col-5">
                    <b>Employee Salary</b>
                </div>
                <div class="col">
                     ${employee.salary}
                </div>
              </div>
              <div class="row">
                <div class="col-5">
                    <b>Joining Date</b>
                </div>
                <div class="col">
                     ${this.getDate(employee.dateJoin)}
                </div>
              </div>
            </div>
            `,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {

      if (result.isConfirmed) {

        console.log('Clicked Yes, File deleted!');
        this.delete(employee.id,i);

      } else if (result.isDismissed) {

        console.log('Clicked No, File is safe!');

      }
    })
  }
}
