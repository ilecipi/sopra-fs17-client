import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../shared/services/authentication.service";
import {Router} from "@angular/router";
import {User} from "../shared/models/user";
import {UserService} from "../shared/services/user.service";
import {NotificationService} from "../shared/services/notification.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: User;

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private userService: UserService,
                private notificationService: NotificationService) {

    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        this.user = new User();

    }

    login() {
        let subscription = this.authenticationService.login(this.user)
            .subscribe(
                (result) => { //success
                    this.user.token = this.authenticationService.getToken();
                    this.user.id = this.authenticationService.getId();
                    this.userService.loginUser(this.user);//Saves current user into the service UserService
                    this.router.navigate(['/lobby']);
                },
                (error) => { //fail
                    let description = 'There was an error in logging you in: either the fields were empty or the username already exists. \n';
                    this.notificationService.showNotification(description +  error._body,3);
                },
                ()=>{ //end of subscription
                    subscription.unsubscribe();
                }
            );
    }

    clearfields() {
        this.user.name = '';
        this.user.username = '';
    }
}
