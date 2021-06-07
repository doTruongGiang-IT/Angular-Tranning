import { Employee } from './../../models/employee.class';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  public employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private activatedRoute: ActivatedRoute, private router: Router) { };

  ngOnInit(): void {};

  createEmployee(firstName: string, lastName: string, email: string): void {
    let employee = new Employee(firstName, lastName, email);
    this.employeeService.addNewEmployee(employee).subscribe(newEmployee => {
      this.employees.push(newEmployee);
      this.router.navigateByUrl("employees");
    }, error => {
      console.log(error.message);
    });
  };

}
