import { Component, OnInit } from '@angular/core';
import { Employee } from './../../models/employee.class';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  public detailEmployee: Employee = {
    id: 0,
    firstName: "",
    lastName: "",
    email: ""
  };

  constructor(private employeeService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute) { };

  ngOnInit(): void {
    this.loadDetail();
  };

  loadDetail(): void {
    let id = Number.parseInt(this.activatedRoute.snapshot.params['id']);
    this.employeeService.getEmployeeByID(id).subscribe(detail => {
      this.detailEmployee = detail;
    }, error => {
      console.log(error.message);
    });
  };

  navigateBack(): void {
    this.router.navigateByUrl("employees");
  };

}
