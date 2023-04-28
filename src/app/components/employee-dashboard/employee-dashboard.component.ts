import { Component, Input, OnInit } from '@angular/core';
import { EmployeeInterface } from '../../models/employee-interface';
import { ApiService } from '../../api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DevicesInterface } from '../../models/devices-interface';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {

  constructor(private api: ApiService, private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  employeeForm = this.fb.group(
    {
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      date: [, [Validators.required]]
    }
   
  )
  devices! : DevicesInterface[];
  id !: number;
  employee!: any;
  selectedEmployee!: EmployeeInterface[];
  idDevice: any;
  employeeAll!: EmployeeInterface[];
  employeeDialog: boolean = false;
  isAdd: boolean = false;
  isEdit: boolean = false;
  ngOnInit(): void {
    this.getEmployeeAll();
    this.getDeviceAll();
  }
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  getEmployeeAll() {
    this.api.getEmployeeAll().subscribe((data) => (this.employeeAll = data));
    
  }
  getDeviceAll() {

    this.api.getDeviceAll().subscribe((data) => (this.devices = data));
  }

  isEmailRequired(){
    return this.employeeForm.get('email')?.errors?.['required'];
  }
  isInvalid(control: string) {

    return (this.employeeForm.get(control)?.invalid && (this.employeeForm.get(control)?.dirty || this.employeeForm.get(control)?.touched));

  }

  openNew() {
    this.employeeForm.reset();
    this.employeeForm.patchValue({
      gender: 'male'
    })
    this.employeeDialog = true;
    this.isAdd = true;
    this.isEdit = false;
  }

  addEmployee() {
    this.messageService.add({ key: 'add', severity: 'success', summary: 'Success', detail: 'Successfully added employees' });
    this.employee = this.employeeForm.value;
    this.employee.name = this.employee.name.trim();
    this.api.postEmployee(this.employee).subscribe(data => {
      this.employeeForm.reset();
      
    })
    this.getEmployeeAll();
    this.employeeDialog = false;
    this.isAdd = false;
  }

  editEmployee(data: any): void {
    this.id = data.id;
    this.employeeForm.patchValue({
      name: data.name,
      gender: data.gender,
      phone: data.phone,
      email: data.email,
      date: data.date
    });
    this.employeeDialog = true;
    this.isEdit = true;
    this.isAdd = false;
  }

  updateEmloyee() {
    this.messageService.add({ key: 'update', severity: 'success', summary: 'Success', detail: 'Employee update successful' });
    this.employee = this.employeeForm.value;
    this.employee.name = this.employee.name.trim();
    this.employee.id = this.id;
    this.api.updateEmployee(this.employee.id, this.employee).subscribe(data => {
      console.log(data);
      this.employeeForm.reset();
      this.getEmployeeAll();
      this.isEdit = false;
      this.employeeDialog = false;
    })
  }

  deleteEmployee(data: any) {
    this.id = data.id;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete employee?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.devices.filter(
          val => {
      
            this.idDevice = val.id;
            if (val.borrower.id == data.id) {
              val.borrower = 'none';
              val.status = 'in stock';
              this.api.updateDevice(this.idDevice,val).subscribe( res => { }
              );
            }
          }
        )
        this.getDeviceAll();
        this.api.deleteEmployee(this.id).subscribe(res => {
          this.getEmployeeAll();
        })

        this.messageService.add({ key: 'update', severity: 'success', summary: 'Success', detail: 'Delete employee successful' });
      }
    })
  }

  idCurrent(data: any) {
    this.id = data.id;
  }

  deleteSelectedEmployee() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected employee?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.employeeAll.filter((val) => {
          if (this.selectedEmployee.includes(val)) {

            this.idCurrent(val)
            this.devices.filter(
              data => {

                if (data.borrower.id == this.id) {
                  this.idDevice = data.id;
                  data.borrower = 'none';
                  data.status = 'in stock';
                  this.api.updateDevice(this.idDevice,data).subscribe(res => { }
                  );
                }
              }
            )
            this.api.deleteEmployee(this.id).subscribe(() => {
            })
          }
        })
        this.employeeAll = this.employeeAll.filter(val => !this.selectedEmployee.includes(val));
        this.messageService.add({ key: 'update', severity: 'success', summary: 'Success', detail: 'Delete the selected employee successful' });
        this.selectedEmployee = [];

      }
    })
  };



  hideDialog() {
    this.employeeDialog = false;
  }



}



// this.cols = [
//       { field: 'id', header: 'ID' },
//       { field: 'name', header: 'NAME' },
//       { field: 'gender', header: 'GENDER' },
//       { field: 'phone', header: 'PHONE' },
//       { field: 'email', header: 'EMAIL' },
//       { field: 'date', header: 'DATE' },
//       { field: 'holding', header: 'HOLDING' },
//     ];