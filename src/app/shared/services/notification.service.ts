import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NotificationService {

    // These two queues are updated as a couple.
    private notificationsQueue: string[] = [];
    private timeToLiveQueue: number[] = [];


    private queueSubscription;
    private timeResolution = 100;

    constructor() {
    }


    pollQueue(): void {
        this.queueSubscription = Observable.interval(this.timeResolution).subscribe(() => {
            if (this.notificationsQueue.length === 0) {
                // Do nothing because queue is empty
            } else if (this.notificationsQueue.length >= 10) {
                this.removeItem();
            } else {
                this.reduceQueue();
            }
        });
    }

    removeItem() {
        this.notificationsQueue.shift();
        this.timeToLiveQueue.shift();
    }

    reduceQueue(): void {
        if (this.timeToLiveQueue.length > 0) {
            for (let i = 0; i < this.timeToLiveQueue.length; i++) {
                this.timeToLiveQueue[i] -= this.timeResolution;
            }
        }
        if (this.timeToLiveQueue[0] <= 0) {
            this.removeItem();
        }
    }

    show(notification: string) {
        this.notificationsQueue.push(notification);
        this.timeToLiveQueue.push(3000);
    }

    getNotificationsQueue(index: number): string {
        if (this.notificationsQueue.length <= index) {
            return '';
        } else {
            return this.notificationsQueue[index];
        }
    }

}
