import { Component } from '@angular/core';
import { User } from './shared/models/user';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]


})
export class AppComponent {
  title = 'Sopra FS17';
  user: User;

}
