import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {GameService} from "../shared/services/game.service";
import {User} from "../shared/models/user";
import {Game} from "../shared/models/game";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent  implements OnInit {
    users: User[] = [];
    games: Game[] = [];

    constructor(private userService: UserService,private gameService: GameService) { }
    ngOnInit() {
        // get users from secure api end point
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
            });
        
        //get games from secure api end point
        this.gameService.getGames()
            .subscribe(games => {
                this.games = games;
            })
    }

}

