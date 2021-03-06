import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/services/authentication.service';
import {Router} from '@angular/router';
import {User} from '../shared/models/user';
import {UserService} from '../shared/services/user.service';
import {NotificationService} from '../shared/services/notification.service';

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

    ngOnInit(): void {
        // reset login status
        this.authenticationService.logout();
        this.user = new User();
        this.user.name = 'SuperCoolName';

    }

    login(): void{
        if (this.user.username === undefined  || this.user.username === '') {
            this.notificationService.show('Please insert a username.');
        }
        else { // if user and username fields are not empty

            let subscription = this.authenticationService.login(this.user)
                .subscribe(
                    (result) => { // success
                        this.user.token = this.authenticationService.getToken();
                        this.user.id = this.authenticationService.getId();
                        this.userService.loginUser(this.user); // Saves current user into the service UserService

                        // SessionStorage of browser is cleared when logging in. Otherwise could incur in routing bugs
                        sessionStorage.clear();
                        // Saves user relevant data into the sessionStorage  of browser

                        sessionStorage.setItem('userUsername',this.userService.getCurrentUser().username);
                        sessionStorage.setItem('userToken',this.userService.getCurrentUser().token);
                        sessionStorage.setItem('userId','' + this.userService.getCurrentUser().id);

                        this.router.navigate(['/lobby']);
                    },
                    (error) => { // fail
                        if (error._status === 403) {
                            // this.notificationService.showNotification('Username already exists',2);
                        }
                    },
                    () => { // end of subscription
                        subscription.unsubscribe();
                    }
                );
        }

    }

    clearfields(): void {
        this.user.username = '';
    }
}
