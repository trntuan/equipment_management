import { AfterContentChecked, AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DevicesInterface } from 'src/app/models/devices-interface';
import { ApiService } from '../../api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeInterface } from '../../models/employee-interface';

@Component({
  selector: 'app-devices-dashboard',
  templateUrl: './devices-dashboard.component.html',
  styleUrls: ['./devices-dashboard.component.css'],
})
export class DevicesDashboardComponent implements OnInit, AfterViewChecked {

  constructor(private api: ApiService, private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService,private cd:ChangeDetectorRef) {}

  selectedDevice!: DevicesInterface[];
  devices!: DevicesInterface[];
  employeeAll! : EmployeeInterface[];
  device : any;
  deviceDialog: boolean = false;
  isAdd: boolean = false;
  isEdit: boolean = false;
  id! : number;
  employee!: any;
  selectedEmployee!: EmployeeInterface;
  nameEmployeeAll!:string[];
  deviceForm = this.fb.group(
    {
      type: ['',[]],
      name: ['',[Validators.required]],
      status:'',
      borrower:[''],
      description:''
    }
  )
  ngOnInit(): void {
    this.getDeviceAll();
    this.getEmployeeAll();
  }
  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }
  
  isInvalid(control: string) {

    return (this.deviceForm.get(control)?.invalid && (this.deviceForm.get(control)?.dirty || this.deviceForm.get(control)?.touched));
   
  }

  getDeviceAll(){
    
    this.api.getDeviceAll().subscribe((data) => (this.devices = data));
  }
  getEmployeeAll() {
    this.api.getEmployeeAll().subscribe( data => (
      this.employeeAll = data
      )
    );
    
  }
 
  openNew(){
    this.deviceForm.reset();
    this.deviceForm.patchValue({
      type: 'pc',
      status: 'in stock'
    })
    this.deviceDialog = true;
    this.isAdd = true;
    this.isEdit = false;
  }
  hideDialog(){
    this.isAdd = false;
    this.deviceDialog = false;
  }
  addDevice(){
    this.messageService.add({ key: 'add', severity: 'success', summary: 'Success', detail: 'Successfully added Device' });
    
    this.device = this.deviceForm.value;
    
    this.device.name = this.device.name.trim();
    if (this.deviceForm.value.status == 'in stock') {
      this.device.borrower = 'none'; 
    }
    this.employee = this.device.borrower;
    this.api.postDevice(this.device).subscribe(data => {
      this.deviceForm.reset();
      this.getDeviceAll();
      this.deviceDialog = false;
    })

  }
  updateDevice(){ 
    this.messageService.add({ key: 'update', severity: 'success', summary: 'Success', detail: 'Device update successful' });
    this.device = this.deviceForm.value;
    this.device.name = this.device.name.trim();
    this.device.id = this.id;
    if (this.deviceForm.value.status == 'in stock') {
      this.device.borrower = 'none';
    }
    this.api.updateDevice(this.device.id,this.device).subscribe(data => {
      this.deviceForm.reset();
      this.getDeviceAll();
      this.isEdit = false;
      this.deviceDialog = false;
    })
  }
  
  editDevice(data:any){
    this.id = data.id;
    this.deviceForm.patchValue({
      type: data.type,
      name: data.name,
      status: data.status,
      description: data.description,
      borrower: data.borrower
    });
    this.deviceDialog = true;
    this.isEdit = true;
    this.isAdd= false;
  }
  deleteDevice(data:any){
    this.id = data.id;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete Device?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.api.deleteDevice(this.id).subscribe(res => {
          this.getDeviceAll();
        })
        this.messageService.add({ key: 'update', severity: 'success', summary: 'Success', detail: 'Delete Device successful' });
      }
    })
  }
  idCurrent(data:any){
    this.id = data.id;
  }
  deleteSelectedDevice() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Device?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.devices.filter((val) => {
          if (this.selectedDevice.includes(val)) {
            this.idCurrent(val)
            this.api.deleteDevice(this.id).subscribe(() => {
            })
          }
        })
        this.getDeviceAll();
        this.devices = this.devices.filter(val => !this.selectedDevice.includes(val));

        this.messageService.add({ key: 'update', severity: 'success', summary: 'Success', detail: 'Delete the selected device successful' });
        this.selectedDevice = [];

      }
      })
    };
}




