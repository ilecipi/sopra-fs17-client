import { TestBed, inject } from '@angular/core/testing';
import { UserService } from './user.service';
describe('UserService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [UserService]
        });
    });
    it('should ...', inject([UserService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=/Users/sophy/Desktop/Imhotep/sopra-fs17-group11-client/src/app/shared/services/user.service.spec.js.map