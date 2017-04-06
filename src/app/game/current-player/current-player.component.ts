import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../shared/models/user';
import {GameService} from '../../shared/services/game.service';
import {UserService} from '../../shared/services/user.service';

@Component({
    selector: 'current-player',
    templateUrl: './current-player.component.html',
    styleUrls: ['./current-player.component.css']
})
export class CurrentPlayerComponent implements OnInit {
    @Input()
    currentUser: User;

    constructor(private gameService: GameService,
                private userService: UserService) {
    }

    ngOnInit() {
    }
}
