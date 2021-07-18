import { Employee } from './../../models/employee.class';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  public employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private activatedRoute: ActivatedRoute, private router: Router) { };

  ngOnInit(): void {};

  createEmployee(firstName: string, lastName: string, email: string): void {
    let employee = new Employee(firstName, lastName, email);
    this.subs.push(
      this.employeeService.addNewEmployee(employee).subscribe(newEmployee => {
        this.employees.push(newEmployee);
        this.router.navigateByUrl("employees");
      }, error => {
        console.log(error.message);
      })
    );
  };

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      if(sub) {
        sub.unsubscribe();
      }
    })
  };

}
