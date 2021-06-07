import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.class';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private URL: string = "http://localhost:8080/api/v1/employees";

  constructor(private http: HttpClient) {};

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.URL);
  };

  getEmployeeByID(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.URL}/${id}`);
  };

  addNewEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.URL, employee);
  };

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.URL}/${id}`, employee);
  };

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.URL}/${id}`);
  };

}
