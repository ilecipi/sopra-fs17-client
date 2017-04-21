import {Component, OnInit} from '@angular/core';
import {User} from './shared/models/user';
import {UserService} from './shared/services/user.service';
import {GameService} from './shared/services/game.service'
import {ShipService} from "./shared/services/ship.service";
import {TempleService} from './shared/services/temple.service';
import {NotificationService} from './shared/services/notification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [UserService, GameService, ShipService, TempleService]

})
export class AppComponent implements OnInit{
    constructor(private notificationService: NotificationService) {
    }

    ngOnInit(){
        this.notificationService.initializeNotification();
    }

    title = 'Sopra FS17';
    user: User;


}
