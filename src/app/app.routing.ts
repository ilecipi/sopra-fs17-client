import {RouterModule, Routes} from "@angular/router";

import {AuthGuardService} from "./shared/services/auth-guard.service";
import {LoginComponent} from "./login/login.component";
import {GameComponent} from "./game/game.component";
import {LobbyComponent} from "./lobby/lobby.component";
import {EndGameComponent} from "./end-game/end-game.component";


const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'lobby', component: LobbyComponent, canActivate: [AuthGuardService]},
    {path: 'game', component: GameComponent, canActivate: [AuthGuardService]},
    {path: 'end-game', component: EndGameComponent, canActivate: [AuthGuardService]},


    // Otherwise redirect to home
    {path: '**', redirectTo: 'login'}
];

export const routing = RouterModule.forRoot(appRoutes);
