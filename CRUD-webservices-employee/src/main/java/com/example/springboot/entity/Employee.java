package com.example.springboot.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "employees")
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull
	@Size(min = 2, message = "Employee first name should have at least 2 characters")
	@Column(name = "first_name")
	private String firstName;
	
	@NotNull
	@Size(min = 3, message = "Employee last name should have at least 3 characters")
	@Column(name = "last_name")
	private String lastName;
	
	@NotNull
	@Email
	@Column(name = "email")
	private String email;
	
	public Employee() {};

	public Employee(String firstName, String lastName, String email) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	};

	public long getId() {
		return id;
	};

	public void setId(long id) {
		this.id = id;
	};

	public String getFirstName() {
		return firstName;
	};

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	};

	public String getLastName() {
		return lastName;
	};

	public void setLastName(String lastName) {
		this.lastName = lastName;
	};

	public String getEmail() {
		return email;
	};

	public void setEmail(String email) {
		this.email = email;
	};
	
}
