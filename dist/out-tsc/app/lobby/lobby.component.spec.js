import { async, TestBed } from '@angular/core/testing';
import { LobbyComponent } from './lobby.component';
describe('LobbyComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [LobbyComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(LobbyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=C:/Users/Silvo/Dropbox/UZH/FS17/SOPRA/Git repository/sopra-fs17-group11-client/src/app/lobby/lobby.component.spec.js.map