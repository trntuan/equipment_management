import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { DevicesInterface } from './models/devices-interface';

import { EmployeeInterface } from './models/employee-interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  private REST_API_EMPLOYEE = 'http://localhost:3000/employee';
  private REST_API_DEVICES = 'http://localhost:3000/devices';

  getEmployeeAll(): Observable<EmployeeInterface[]> {
    return this.http.get<EmployeeInterface[]>(this.REST_API_EMPLOYEE).pipe(
      
    );
  }

  postEmployee(data: EmployeeInterface) {
    return this.http.post<EmployeeInterface>(this.REST_API_EMPLOYEE, data)
      .pipe(map((res: EmployeeInterface) => {
        return res;
      }))
  }

  updateEmployee(id: number, data: EmployeeInterface) {
    return this.http.put<EmployeeInterface>(this.REST_API_EMPLOYEE+ "/" + id, data)
      .pipe(map((res: EmployeeInterface) => {
        return res;
      }))
  }

  deleteEmployee(id: number) {
    return this.http.delete<EmployeeInterface>(this.REST_API_EMPLOYEE +"/" + id)
      .pipe(map((res: EmployeeInterface) => {
        return res;
      }))
  }
//--------------devive-------------
   getDeviceAll(): Observable<DevicesInterface[]> {
    return this.http.get<DevicesInterface[]>(this.REST_API_DEVICES).pipe(
      
    );
  }
  postDevice(data: DevicesInterface){
    return this.http.post<DevicesInterface>(this.REST_API_DEVICES,data).pipe(
      map((res: DevicesInterface)=> {
        return res;
      })
    )
  }

  updateDevice(id: number,data: DevicesInterface){
    return this.http.put<DevicesInterface>(this.REST_API_DEVICES + "/" +id,data).pipe(map((res:DevicesInterface)=>{}))
  }
  deleteDevice(id:number) {
    return this.http.delete<DevicesInterface>(this.REST_API_DEVICES+"/"+id).pipe(map(
      (res: DevicesInterface) => {
        return res;
      })
    )
  }
}
