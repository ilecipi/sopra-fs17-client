import {Component, OnInit} from "@angular/core";
import {NotificationService} from "../shared/services/notification.service";

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
    private maxNumOfNotification: number = 10;
    private array: number[] = [];


    constructor(private notificationService: NotificationService) {
    }

    ngOnInit() {
        for (let i = 0; i < this.maxNumOfNotification; i++) {
            this.array.push(0);
        }


        this.notificationService.pollQueue();
    }

    getNotification(index: number): string {
        return this.notificationService.getNotificationsQueue(index);
    }

}
