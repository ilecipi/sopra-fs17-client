import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class NotificationService {

    private currentNotification: string;
    private currentNotificationSubject = new Subject<string>();
    private isShown: boolean = false;

    constructor() {
    }

    //styles required to move each ship in the correct place.
    private notificationStyle = document.createElement('style');

    initializeNotification(): void {

        //styles initialization for display feature
        this.notificationStyle.innerHTML = '.notification {display: none;}';
        document.getElementsByTagName('app-root')[0].appendChild(this.notificationStyle);
        this.isShown = false;
    }

    showNotification(notificationMessage: string, seconds: number) {
        this.setNotification(notificationMessage);
        if (!this.isShown) {
            document.getElementsByTagName('app-root')[0].removeChild(this.notificationStyle);
            setTimeout(() => this.hideNotification(), seconds * 1000);
            this.isShown = true;
        }
        else {
            setTimeout(() => this.hideNotification(), seconds * 1000);
        }

    }

    hideNotification() {
        document.getElementsByTagName('app-root')[0].appendChild(this.notificationStyle);
        this.isShown = false;
    }

    setNotification(notification: string) {
        this.currentNotification = notification;
        this.currentNotificationSubject.next(this.currentNotification);
    }

    //used to send a flow of Notifications to the notifications component
    getCurrentNotification(): Observable<string> {
        return this.currentNotificationSubject;
    }

}
