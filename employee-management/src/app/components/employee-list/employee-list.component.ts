import { Subscription } from 'rxjs';
import { Employee } from './../../models/employee.class';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  public employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { };

  ngOnInit(): void {
    this.loadEmployeeList();
  };

  loadEmployeeList(): void {
    this.subs.push(
      this.employeeService.getAllEmployee().subscribe(employeeList => {
        this.employees = employeeList;
      }, error => {
        console.log(error.message);
      })
    );
  };

  deleteEmployee(id: number): void {
    this.subs.push(
      this.employeeService.deleteEmployee(id).subscribe(deletedEmployee => {
        let index = this.getIndex(deletedEmployee.id);
        this.employees.splice(index, 1);
      }, error => { 
        console.log(error.message);
      })
    );
  };

  getIndex(id:number): number {
    let result = -1;
    this.employees.forEach((employee, index) => {
      if(employee.id === id) {
        result = index;
      };
    });
    return result;
  };

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      if(sub) {
        sub.unsubscribe();
      }
    })
  };

}
