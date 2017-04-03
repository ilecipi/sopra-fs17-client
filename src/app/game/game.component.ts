import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {GameService} from "../shared/services/game.service";
import {User} from "../shared/models/user";
import {Game} from "../shared/models/game";
import {Ship} from "../shared/models/ship";

@Component({
    selector: 'game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService, private gameService: GameService) {
    }

    ngOnInit() {
        // get users from secure api end point
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
            });

        // creates a DummyGame
        this.gameService.setDummyGame();

    }


}
