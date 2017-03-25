import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {environment} from "../../../environments/environment";

@Injectable()
export class UserService {
    private apiUrl: string;
    private currentUser: User;
    private loggedIn: boolean;


    constructor(private http: Http,
                private authenticationService: AuthenticationService) {
        //selects correct URL on the basis of the environment mode
        this.apiUrl = environment.apiUrl;
        this.loggedIn = false;
    }


    loginUser(user: User): void {
        this.currentUser = user;
        this.loggedIn = true;
    }

    getCurrentUser(): User {
        return this.currentUser;
    }

    getLoggedStatus(): boolean {
        return this.loggedIn;
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