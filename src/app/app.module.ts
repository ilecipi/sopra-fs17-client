import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {LoginComponent} from "./login/login.component";
import {GameComponent} from "./game/game.component";
import {LobbyComponent} from './lobby/lobby.component';
import {MarketSiteboardComponent} from './game/market-siteboard/market-siteboard.component';
import {PyramidSiteboardComponent} from './game/pyramid-siteboard/pyramid-siteboard.component';
import {TempleSiteboardComponent} from './game/temple-siteboard/temple-siteboard.component';
import {BurialChamberSiteboardComponent} from './game/burial-chamber-siteboard/burial-chamber-siteboard.component';
import {ObeliskSiteboardComponent} from './game/obelisk-siteboard/obelisk-siteboard.component';
import {OpposingPlayerComponent} from './game/opposing-player/opposing-player.component';
import {AuthGuardService} from "./shared/services/auth-guard.service";
import {UserService} from "./shared/services/user.service";
import {GameService} from "./shared/services/game.service";
import {ShipService} from "./shared/services/ship.service";
import {MoveService} from './shared/services/move.service';
import {ObeliskService} from './shared/services/obelisk.service';
import {BurialChamberService} from './shared/services/burial-chamber.service';
import {PyramidService} from './shared/services/pyramid.service';
import {MarketService} from "./shared/services/market.service";
import {NotificationService} from "./shared/services/notification.service";

import {routing} from "./app.routing";
import {AuthenticationService} from "./shared/services/authentication.service";
import {CurrentPlayerComponent} from './game/current-player/current-player.component';
import {InfoBoardComponent} from './game/info-board/info-board.component';
import {HarbourComponent} from './game/harbour/harbour.component';
import {MarketCardComponent} from './game/market-card/market-card.component';
import {EndGameComponent} from './end-game/end-game.component';
import {NotificationComponent} from './notification/notification.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        GameComponent,
        LobbyComponent,

        MarketSiteboardComponent,
        PyramidSiteboardComponent,
        TempleSiteboardComponent,
        BurialChamberSiteboardComponent,
        ObeliskSiteboardComponent,
        OpposingPlayerComponent,
        CurrentPlayerComponent,
        InfoBoardComponent,
        HarbourComponent,
        MarketCardComponent,
        EndGameComponent,
        NotificationComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        routing
    ],
    providers: [AuthenticationService,
        AuthGuardService,
        UserService,
        GameService,
        ShipService,
        MoveService,
        ObeliskService,
        BurialChamberService,
        PyramidService,
        MarketService,
        NotificationService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
