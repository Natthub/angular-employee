import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../service/employee.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  Id: any;
  employeeForm: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = true;
  employee: any;

  constructor(
    public formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.Id = this.route.snapshot.paramMap.get('id')
    this.employeeForm = this.formBuilder.group({
      Id:['',Validators.required],
      name:['',Validators.required],
      designation:[''],
      address:[''],
      salary:['',Validators.required],
      dateJoin:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.employeeService.GetEmployee(this.Id).subscribe(res => {
      console.log(res)
      this.isLoading = false
      this.setForm(res)
    })
  }

  handleClickBack() {
    this.router.navigateByUrl("/")
  }

  onSubmit() {
    console.log(this.employeeForm.controls)
    this.submitted = true
    this.employeeService.UpdateEmployee(this.Id,this.employeeForm.value)
      .subscribe(()=>{
        console.log("Edit Successfully")
        this.showSuccessAlert()
        this.submitted = false
      },(error)=>{
        console.log(error)
      })
  }

  showSuccessAlert() {
    Swal.fire('Success!', 'Edit Employee Successfully!', 'success').then(r => this.router.navigateByUrl("/"))
  }

  private setForm(res: any) {
    this.employeeForm.patchValue({
      Id: this.Id,
      name: res.name,
      designation:res.designation,
      address:res.address,
      salary:res.salary,
      dateJoin: new Date(res.dateJoin)
    });
  }
}
