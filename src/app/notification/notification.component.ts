import {Component, OnInit} from "@angular/core";
import {NotificationService} from "../shared/services/notification.service";

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

    constructor(private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.notificationService.pollQueue();
    }

    getNotification(index: number): string {
        return this.notificationService.getNotificationsQueue(index);
    }

}
