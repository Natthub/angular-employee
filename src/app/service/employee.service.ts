import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

export class Employee{
  Id!:Number;
  name!:String;
  designation!:String;
  address!:String;
  salary!:Number;
  dateJoin!:String;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  REST_API: string = "https://localhost:44328/api/Employees"
  httpHeaders = new HttpHeaders().set('Content-Type','application/json')

  constructor(private httpClient:HttpClient) { }

  // Error
  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage)
  }

  // Create
  CreateEmployee(data:Employee): Observable<any> {
    let API_URL = `${this.REST_API}`
    return this.httpClient.post(API_URL,data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // get all employee
  GetEmployees(){
    return this.httpClient.get(`${this.REST_API}`)
  }

  // get single employee
  GetEmployee(id:any): Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.get(API_URL,{headers:this.httpHeaders})
      .pipe(map((res:any) => {
        return res || {}
      }),
      catchError(this.handleError)
      )
  }

  // Update
  UpdateEmployee(id:any,data:any): Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.put(API_URL,data,{headers:this.httpHeaders})
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  deleteEmployee(id:any):Observable<any>{
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.delete(API_URL,{headers:this.httpHeaders})
      .pipe(
        catchError(this.handleError)
      )
  }
}
