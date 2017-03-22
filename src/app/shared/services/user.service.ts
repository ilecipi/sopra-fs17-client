import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { AuthenticationService } from "./authentication.service";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { environment } from "../../../environments/environment";

@Injectable()
export class UserService {
    private apiUrl: string;

    constructor(private http: Http,
                private authenticationService: AuthenticationService) {
        //selects correct URL on the basis of the environment mode
        this.apiUrl = environment.apiUrl;
    }

    getUsers(): Observable<User[]> {
        // add authorization header with token
        let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
        let options = new RequestOptions({headers: headers});

        // get users from api
        return this.http.get(this.apiUrl + '/users', options)
            .map((response: Response) => response.json());
    }

    pollUsers(time = 1500) {
        return Observable.interval(time).flatMap(() => {
            return this.getUsers();
        })
    }
}