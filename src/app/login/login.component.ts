import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../shared/services/authentication.service";
import {Router} from "@angular/router";
import {User} from "../shared/models/user";
import {UserService} from "../shared/services/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  user: User;

  constructor(private router: Router,
              private _service: AuthenticationService,
              private _router: Router,
              private userService: UserService) {

  }

  ngOnInit() {
    // reset login status
    this._service.logout();
    this.user = new User();

  }

  login() {
    this._service.login(this.user)
      .subscribe(result => {
        if (result) {
            this.userService.loginUser(this.user);//Saves current user into the service UserService
            this.router.navigate(['/lobby']);
        } else {
            this.error = 'Username exists';
            this.loading = false;
        }
      });

}

  clearfields() {
    this.user.name = '';
    this.user.username = '';
  }


}
