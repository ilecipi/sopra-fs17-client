import { async, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
describe('GameComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [GameComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(GameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/sophy/Desktop/Imhotep/sopra-fs17-group11-client/src/app/game/game.component.spec.js.map