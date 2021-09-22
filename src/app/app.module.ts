import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CreateCharacterComponent } from "./create-character/create-character.component";
import { EmployeeDashboardComponent } from "./employee-dashboard/employee-dashboard.component";
import { EmployeeService } from "./employee.service";
import { HeaderComponent } from "./header/header.component";

const routes = [
  { path: "", component: EmployeeDashboardComponent },
  { path: "new-employee", component: CreateCharacterComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDashboardComponent,
    HeaderComponent,
    CreateCharacterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
