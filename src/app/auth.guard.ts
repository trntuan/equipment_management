import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { loginService } from './login.service';
import { loginInterface } from './models/login-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private api: loginService, private router: Router) {
    this.getLogin();
  }
  account!: loginInterface[];

  getLogin() {
    this.api.getAccount().subscribe((res) => {
      this.account = res;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.account[0].status == 'sign out') {
      return true;
    } else {
      // this.router.navigate(['/login']);
      return false;
    }
  }
}
