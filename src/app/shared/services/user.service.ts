import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs/Rx";
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
        this.loggedIn=true;
    }

    logoutUser(): void {
        this.currentUser = new User();
    }

    setCurrentUser(user: User):void{
        this.currentUser=user;
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

    pollUser(token: string) {
        return Observable.interval(1500).flatMap(() => {
            return this.getUser(token);

        });
    }

    getUser(token: string): Observable<User> {
        let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
        let options = new RequestOptions({headers: headers});

        return this.http.get(this.apiUrl + '/users/' + token, options)
            .map((response: Response) => response.json());
    }

    setDummyUser(): void {
        let dummyUser = new User;
        dummyUser.id = 1;
        dummyUser.name = "Name 1";
        dummyUser.username = "Player 1";
        dummyUser.token = "1";
        dummyUser.status = "IS_PLAYING";
        dummyUser.games = [1];
        dummyUser.moves = [1];
        dummyUser.color = "grey";
        dummyUser.supplySled = 1;
        this.currentUser=dummyUser;
    }

}