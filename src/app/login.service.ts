import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { loginInterface } from './models/login-interface';

@Injectable({
    providedIn: 'root',
})
export class loginService {

    constructor(private http: HttpClient) { }
    

    private REST_API_PROFILE = 'http://localhost:3000/admin';

    getAccount(): Observable<loginInterface[]> {
        return this.http.get<loginInterface[]>(this.REST_API_PROFILE).pipe(
        );
    }
    updateAccount(id: number, data: loginInterface) {
        return this.http.put<loginInterface>(this.REST_API_PROFILE + "/" + id, data)
            .pipe(map((res: loginInterface) => {
                return res;
            }))
    }
    

}
