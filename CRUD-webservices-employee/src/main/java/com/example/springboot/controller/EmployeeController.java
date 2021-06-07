package com.example.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.springboot.entity.Employee;
import com.example.springboot.exception.ResuorceNotFoundException;
import com.example.springboot.repository.EmployeeRepository;

@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

	@Autowired
	EmployeeRepository employeeRepository;
	
	// Get all employee
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("employees")
	public List<Employee> getAllEmployee() {
		return this.employeeRepository.findAll();
	}
	
	// Get employee by id
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable(value = "id") long employeeId) {
		Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ResuorceNotFoundException("Employee not found"));
		return ResponseEntity.ok().body(employee);
	};
	
	// Create new employee
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("employees")
	public Employee createEmployee(@Valid @RequestBody Employee employee) {
		return employeeRepository.save(employee);
	};
	
	// Update smart phone by id
	@CrossOrigin(origins = "http://localhost:4200")
	@PutMapping("employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable(value = "id") long employeeId, @Valid @RequestBody Employee updateEmployee) {
		Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ResuorceNotFoundException("Employee not found"));
		employee.setFirstName(updateEmployee.getFirstName());
		employee.setLastName(updateEmployee.getLastName());
		employee.setEmail(updateEmployee.getEmail());
		Employee editEmployee = employeeRepository.save(employee);
		return ResponseEntity.ok().body(editEmployee);
	};
	
	// Delete smart phone by id
	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping("employees/{id}")
	public Map<String, Boolean> deleteEmployess(@PathVariable(value = "id") long employeeId) {
		Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ResuorceNotFoundException("Smart phone not found"));
		this.employeeRepository.delete(employee);
		Map<String, Boolean> respone = new HashMap<>();
		respone.put("deleted: ", Boolean.TRUE);
		return respone;
	};
	
}
