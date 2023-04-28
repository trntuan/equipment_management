import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { loginService } from 'src/app/login.service';
import { loginInterface } from '../../models/login-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private api: loginService, private router: Router, private messageService: MessageService) { }
  loginForm!: FormGroup;
  account!:loginInterface[];
  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
     
    )
   
    this.getLogin();
  }
  login(): void{
    if (this.account[0].email == this.loginForm.value.email)
    {
      if (this.account[0].password == this.loginForm.value.password){
       
        this.messageService.add({ key: 'log', severity: 'success', summary: 'Success', detail: 'Successfully login' });

        this.account[0].status = "sign out";
        this.api.updateAccount(1, this.account[0]).subscribe(data => {
          console.log(data);
          this.getLogin();
          window.location.assign('http://localhost:4200/devices');
        })
        
        
     
      }
      
      else{
        this.messageService.add({ key: 'log', severity: 'error', summary: 'error', detail: 'password wrong' });
      }
   
    }else{
      this.messageService.add({ key: 'log', severity: 'error', summary: 'error', detail: 'Account does not exist' });
    }
  }
  
  getLogin(){
    this.api.getAccount().subscribe(
      res => {
        this.account = res;
      }
    )
  }
  

  

  
}



  function getLogin() {
    throw new Error('Function not implemented.');
  }
// isInvalid(control: string) {

//   return (this.employeeForm.get(control)?.invalid && (this.employeeForm.get(control)?.dirty || this.employeeForm.get(control)?.touched));

// }