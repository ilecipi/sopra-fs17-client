export class Notification {
    title: string;
    description: string;
    serverResponse: string;

    constructor(title: string, description: string, serverResponse: string) {
        this.title = title;
        this.description = description;
        this.serverResponse = serverResponse;
    }

}
