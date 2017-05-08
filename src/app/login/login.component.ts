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

        // Checks if the user has already created an account in a previous session.
        // If so, then it gets redirected to the lobby.
        if(localStorage.getItem('userToken') && localStorage.getItem('userUsername')){
            this.notificationService.show('Welcome back ' + localStorage.getItem('userUsername') + '!');
            this.router.navigate(['/lobby']);
        }
    }

    login(): void{
        if ((this.user.name === undefined || this.user.name === '') && (this.user.username === undefined || this.user.username === '')) {
            this.notificationService.show('Please insert a valid name and username');
        }
        else if (this.user.name === undefined || this.user.name === '') {
            this.notificationService.show('Please insert a name.');
        }
        else if (this.user.username === undefined  || this.user.username === '') {
            this.notificationService.show('Please insert a username.');
        }
        else { // if user and username fields are not empty

            let subscription = this.authenticationService.login(this.user)
                .subscribe(
                    (result) => { // success
                        this.user.token = this.authenticationService.getToken();
                        this.user.id = this.authenticationService.getId();
                        this.userService.loginUser(this.user); // Saves current user into the service UserService

                        // Saves user token into the browser local storage
                        localStorage.setItem('userToken', result.token);
                        localStorage.setItem('userUsername',result.username);

                        this.router.navigate(['/lobby']);
                    },
                    (error) => { // fail
                        if (error._status === 500) {
                            this.notificationService.show('Username already exists');
                        }
                    },
                    () => { // end of subscription
                        subscription.unsubscribe();
                    }
                );
        }

    }

    clearfields(): void {
        this.user.name = '';
        this.user.username = '';
    }
}
