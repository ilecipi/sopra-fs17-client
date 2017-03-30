import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {DragulaModule} from "ng2-dragula";

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

import {AuthGuardService} from "./shared/services/auth-guard.service";
import {UserService} from "./shared/services/user.service";
import {GameService} from "./shared/services/game.service";
import {routing} from "./app.routing";
import {AuthenticationService} from "./shared/services/authentication.service";


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
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        DragulaModule,
        routing
    ],
    providers: [AuthenticationService, AuthGuardService, UserService, GameService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
