import {Component, OnInit} from '@angular/core';
import {Notification} from '../shared/models/notification';
import {NotificationService} from "../shared/services/notification.service";

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {


    private currentNotification: Notification;
    private notificationSubscription: any;

    constructor(private notificationService:NotificationService) {
    }

    ngOnInit() {
        this.currentNotification= new Notification('','','');

        this.notificationSubscription = this.notificationService.getCurrentNotification().subscribe((notification) => {
            this.currentNotification = notification;
        });
    }

}
