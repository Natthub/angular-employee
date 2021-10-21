import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../service/employee.service";
import {LogicalFileSystem} from "@angular/compiler-cli/src/ngtsc/file_system";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup
  submitted: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.formBuilder.group({
      name:['',Validators.required],
      designation:[''],
      address:[''],
      salary:['',Validators.required],
      dateJoin:['',Validators.required]
    })
  }

  ngOnInit() {

  }


  handleClickBack() {
    this.router.navigateByUrl("/")
  }

  onSubmit() {
    console.log(this.employeeForm.controls)
    this.submitted = true
    this.employeeService.CreateEmployee(this.employeeForm.value)
      .subscribe(()=>{
        console.log("Create Successfully")
        this.showSuccessAlert()
        this.submitted = false
        this.employeeForm.reset()
      },(error)=>{
        console.log(error)
      })
  }

  showSuccessAlert() {
    Swal.fire('Success!', 'Create Employee Successfully!', 'success')
  }
}
