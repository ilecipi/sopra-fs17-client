import { RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { GameComponent } from "./game/game.component";
import { LobbyComponent } from "./lobby/lobby.component";
var appRoutes = [
    { path: 'login', component: LoginComponent },
    { path: 'lobby', component: LobbyComponent },
    //{ path: 'lobby',component: LobbyComponent, canActivate: [AuthGuardService]},
    //{ path: 'game', component: GameComponent, canActivate: [AuthGuardService] },
    { path: 'game', component: GameComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];
export var routing = RouterModule.forRoot(appRoutes);
//# sourceMappingURL=/Users/sophy/Desktop/Imhotep/sopra-fs17-group11-client/src/app/app.routing.js.map