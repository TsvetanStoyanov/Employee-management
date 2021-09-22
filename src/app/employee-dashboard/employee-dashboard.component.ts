import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  formData!: FormGroup;
  employeeData!: any;
  employeeObject: EmployeeModel = new EmployeeModel();

  constructor(private FormBuilder: FormBuilder, private employee: EmployeeService) {}

  ngOnInit(): void {
    this.formData = this.FormBuilder.group({
      firstName: [''],
      lastName: [''],
      experience: [''],
      dateStarted: [''],
      salary: [''],
      vacation: [''],
    });

    this.getAllEmployee();
  }

  //POST ALL DATA FROM INPUTS
  postEmplyeeDetails() {
    if (this.formData.invalid) {
      alert('Please fill required inputs');
      return;
    }

    this.employeeObject.id = this.formData.value.id;
    this.employeeObject.firstName = this.formData.value.firstName;
    this.employeeObject.lastName = this.formData.value.lastName;
    this.employeeObject.experience = this.formData.value.experience;
    this.employeeObject.dateStarted = this.formData.value.dateStarted;
    this.employeeObject.salary = this.formData.value.salary;
    this.employeeObject.vacation = this.formData.value.vacation;

    this.employee.postRow(this.employeeObject).subscribe(
      (res) => {
        console.log(res);
        let cancel = document.getElementById('cancel');
        cancel?.click();
        this.getAllEmployee();
      },
      (err) => {
        alert('Something went wrong!');
      }
    );
  }

  // GET ALL DATA FROM JSON DB
  getAllEmployee() {
    this.employee.getRows().subscribe((res) => {
      this.employeeData = res;
    });
  }

  // EDIT DATA FROM JSON DB
  rowEdit(row: any) {
    this.employeeObject.id = row.id;
    this.formData.controls['firstName'].setValue(row.firstName);
    this.formData.controls['lastName'].setValue(row.lastName);
    this.formData.controls['experience'].setValue(row.experience);
    this.formData.controls['dateStarted'].setValue(row.dateStarted);
    this.formData.controls['salary'].setValue(row.salary);
    this.formData.controls['vacation'].setValue(row.vacation);
  }

  // UPDDATE ROW
  updateEmplyeeDetails() {
    this.employeeObject.firstName = this.formData.value.firstName;
    this.employeeObject.lastName = this.formData.value.lastName;
    this.employeeObject.experience = this.formData.value.experience;
    this.employeeObject.dateStarted = this.formData.value.dateStarted;
    this.employeeObject.salary = this.formData.value.salary;
    this.employeeObject.vacation = this.formData.value.vacation;

    this.employee
      .updateRow(this.employeeObject, this.employeeObject.id)
      .subscribe((res) => {
        console.log(res);
        let cancel = document.getElementById('cancel');
        cancel?.click();
        this.getAllEmployee();
      });
  }

  // DELETE ROW
  deleteRow(row: any) {
    this.employee.deleteRow(row.id).subscribe((res) => {
      alert('Employee: ' + row.firstName + ' deleted');
      this.getAllEmployee();
    });
  }
}
