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
import {BurialchamberSiteboardComponent} from './game/burialchamber-siteboard/burialchamber-siteboard.component';
import {ObeliskSiteboardComponent} from './game/obelisk-siteboard/obelisk-siteboard.component';
import {OpposingPlayerComponent} from './game/opposing-player/opposing-player.component';
import {AuthGuardService} from "./shared/services/auth-guard.service";
import {UserService} from "./shared/services/user.service";
import {GameService} from "./shared/services/game.service";
import {ShipService} from "./shared/services/ship.service";
import {MoveService} from './shared/services/move.service';
import {ObeliskService} from './shared/services/obelisk.service';
import {routing} from "./app.routing";
import {AuthenticationService} from "./shared/services/authentication.service";
import {Ng2DragDropModule} from "ng2-drag-drop";
import {CurrentPlayerComponent} from './game/current-player/current-player.component';
import {InfoBoardComponent} from './game/info-board/info-board.component';
import {HarbourComponent} from './game/harbour/harbour.component';
import {MarketCardComponent} from './game/market-card/market-card.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        GameComponent,
        LobbyComponent,

        MarketSiteboardComponent,
        PyramidSiteboardComponent,
        TempleSiteboardComponent,
        BurialchamberSiteboardComponent,
        ObeliskSiteboardComponent,
        OpposingPlayerComponent,
        CurrentPlayerComponent,
        InfoBoardComponent,
        HarbourComponent,
        MarketCardComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        Ng2DragDropModule,
        routing
    ],
    providers: [AuthenticationService, AuthGuardService, UserService, GameService, ShipService, MoveService, ObeliskService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
