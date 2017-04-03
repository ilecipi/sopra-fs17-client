import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {LoginComponent} from "./login/login.component";
import {GameComponent} from "./game/game.component";
import {LobbyComponent} from './lobby/lobby.component';
import {HarbourComponent} from './harbour/harbour.component';
import {MarketSiteboardComponent} from './market-siteboard/market-siteboard.component';
import {PyramidSiteboardComponent} from './pyramid-siteboard/pyramid-siteboard.component';
import {TempleSiteboardComponent} from './temple-siteboard/temple-siteboard.component';
import {BurialchamberSiteboardComponent} from './burialchamber-siteboard/burialchamber-siteboard.component';
import {ObeliskSiteboardComponent} from './obelisk-siteboard/obelisk-siteboard.component';
import { OpposingPlayerComponent } from './opposing-player/opposing-player.component';


import {AuthGuardService} from "./shared/services/auth-guard.service";
import {UserService} from "./shared/services/user.service";
import {GameService} from "./shared/services/game.service";
import {routing} from "./app.routing";
import {AuthenticationService} from "./shared/services/authentication.service";

//Drag and Drop
import {Ng2DragDropModule} from "ng2-drag-drop";
import { CurrentPlayerComponent } from './current-player/current-player.component';
import { Player1Component } from './player1/player1.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        GameComponent,
        LobbyComponent,
        HarbourComponent,
        MarketSiteboardComponent,
        PyramidSiteboardComponent,
        TempleSiteboardComponent,
        BurialchamberSiteboardComponent,
        ObeliskSiteboardComponent,
        OpposingPlayerComponent,
        CurrentPlayerComponent,
        Player1Component,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        Ng2DragDropModule, //Drag and Drop
        routing
    ],
    providers: [AuthenticationService, AuthGuardService, UserService, GameService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
