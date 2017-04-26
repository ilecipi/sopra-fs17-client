import {Component, OnInit} from "@angular/core";
import {NotificationService} from "../shared/services/notification.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

    private notifications: string[];
    private notificationSubscription: any;

    constructor(private notificationService:NotificationService) {
    }

    ngOnInit() {
        this.pollQueue();
    }

    pollQueue(): void {
        this.notificationSubscription = Observable.interval(100).subscribe(() => {
            this.notifications = this.notificationService.getNotificationsQueue();
        });
    }

}
