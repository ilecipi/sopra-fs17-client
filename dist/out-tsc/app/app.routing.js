import { RouterModule } from '@angular/router';
import { AuthGuardService } from "./shared/services/auth-guard.service";
import { LoginComponent } from "./login/login.component";
import { GameComponent } from "./game/game.component";
var appRoutes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: GameComponent, canActivate: [AuthGuardService] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
export var routing = RouterModule.forRoot(appRoutes);
//# sourceMappingURL=C:/Users/Silvo/Dropbox/UZH/FS17/SOPRA/Git repository/sopra-fs17-group11-client/src/app/app.routing.js.map