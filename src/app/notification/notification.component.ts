import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../shared/services/notification.service";

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {


    private currentNotification: string;
    private notificationSubscription: any;

    constructor(private notificationService:NotificationService) {
    }

    ngOnInit() {

        this.notificationSubscription = this.notificationService.getCurrentNotification().subscribe((notification) => {
            this.currentNotification = notification;
        });
    }

}
