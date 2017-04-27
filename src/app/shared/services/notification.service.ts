import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class NotificationService {

    private currentNotification: string;
    private currentNotificationSubject = new Subject<string>();
    private isShown: boolean = false;

    private notificationsQueue: string[] = [];
    private queueSubscription;
    private queueToUpdate = true;

    constructor() {
        this.pollQueue();
    }


    pollQueue(): void {
        this.queueSubscription = Observable.interval(100).subscribe(x => {
            if (this.notificationsQueue.length == 0) {
                //do nothing because queue is empty
            }
            if (this.notificationsQueue.length >= 7){
                this.removeItem();
            }
            else {

                if (this.queueToUpdate) {
                    this.removeItem();
                    this.queueToUpdate = false;
                    this.wait3secs();

                }
            }
        });
    }

    removeItem() {
        this.notificationsQueue.shift();
    }

    wait3secs() {
        setTimeout(() => {
            this.queueToUpdate = true;
        }, 1500)
    }

    show(notification: string) {
        this.notificationsQueue.push(notification);
    }

    getNotificationsQueue(): string[] {
        return this.notificationsQueue;
    }
}
