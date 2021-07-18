import { Subscription } from 'rxjs';
import { Employee } from './../../models/employee.class';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  public employees: Employee[] = [];
  public updatedEmployee: Employee = {
    id: 0,
    firstName: "",
    lastName: "",
    email: ""
  };

  constructor(private employeeService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute) { };

  ngOnInit(): void {
    this.selectEmployee();
  };

  selectEmployee(): void {
    let id = Number.parseInt(this.activatedRoute.snapshot.params['id']);
    this.subs.push(
      this.employeeService.getEmployeeByID(id).subscribe(editEmployee => {
        this.updatedEmployee = editEmployee;
      }, error => {
        console.log(error.message);
      })
    );
  };

  updateEmployee(): void {
    this.subs.push(
      this.employeeService.updateEmployee(this.updatedEmployee.id, this.updatedEmployee).subscribe(emp => {
        let index = this.getIndex(emp.id);
        if(index !== -1) {
          this.employees[index] = emp;
        };
        this.router.navigateByUrl("employees");
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
