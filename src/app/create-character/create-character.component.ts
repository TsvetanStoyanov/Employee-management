import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { EmployeeModel } from "../employee-dashboard/employee-dashboard.model";
import { EmployeeService } from "../employee.service";

@Component({
  selector: "app-create-character",
  templateUrl: "./create-character.component.html",
  styleUrls: ["./create-character.component.css"],
})
export class CreateCharacterComponent implements OnInit {
  formData!: FormGroup;
  employeeData!: any;
  employeeObject: EmployeeModel = new EmployeeModel();

  constructor(
    private FormBuilder: FormBuilder,
    private employee: EmployeeService
  ) {}

  ngOnInit(): void {
    this.formData = this.FormBuilder.group({
      firstName: [""],
      lastName: [""],
      experience: [""],
      dateStarted: [""],
      salary: [""],
      vacation: [""],
    });
  }

  // GET ALL DATA FROM JSON DB
  getAllEmployee() {
    this.employee.getRows().subscribe((res) => {
      this.employeeData = res;
    });
  }

  //POST ALL DATA FROM INPUTS
  postEmplyeeDetails() {
    if (this.formData.invalid) {
      alert("Please fill required inputs");
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
        this.getAllEmployee();
        window.location.href = "/";
      },
      (err) => {
        alert("Something went wrong!");
      }
    );
  }
}
