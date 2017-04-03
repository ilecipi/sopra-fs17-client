import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {LoginComponent} from "./login/login.component";
import {GameComponent} from "./game/game.component";
import {LobbyComponent} from './lobby/lobby.component';
import {HarbourComponent} from './game/harbour/harbour.component';
import {MarketSiteboardComponent} from './game/market-siteboard/market-siteboard.component';
import {PyramidSiteboardComponent} from './game/pyramid-siteboard/pyramid-siteboard.component';
import {TempleSiteboardComponent} from './game/temple-siteboard/temple-siteboard.component';
import {BurialchamberSiteboardComponent} from './game/burialchamber-siteboard/burialchamber-siteboard.component';
import {ObeliskSiteboardComponent} from './game/obelisk-siteboard/obelisk-siteboard.component';
import {OpposingPlayerComponent} from './game/opposing-player/opposing-player.component';
import {AuthGuardService} from "./shared/services/auth-guard.service";
import {UserService} from "./shared/services/user.service";
import {GameService} from "./shared/services/game.service";
import {routing} from "./app.routing";
import {AuthenticationService} from "./shared/services/authentication.service";
import {Ng2DragDropModule} from "ng2-drag-drop";    //Drag and Drop
import {CurrentPlayerComponent} from './game/current-player/current-player.component';


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
