import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { loginService } from './login.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { loginInterface } from './models/login-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'equipment-management';
  constructor(private api: loginService, private router: Router, private messageService: MessageService) {}
  baseLogin!: string;
  account!: loginInterface[];
  ngOnInit(): void {
    this.getLogin();
  }
  getLogin() {
    this.api.getAccount().subscribe(
      res => {
        this.account = res;
      }
    )
  }
  

  get status() {
    return this.account[0]!.status;
  }
  out(){
    this.messageService.add({ key: 'log', severity: 'info', summary: 'info', detail: 'signss out Successfully ' });
    this.account[0]!.status = "sign in";
    this.router.navigate(['devices']);
    this.api.updateAccount(1,this.account[0]).subscribe(data => {
      this.getLogin();

    })
  }
}
