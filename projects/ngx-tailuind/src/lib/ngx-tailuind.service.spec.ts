import {TestBed} from '@angular/core/testing';

import {NgxTailuindService} from './ngx-tailuind.service';

describe('NgxTailuindService', () => {
    let service: NgxTailuindService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NgxTailuindService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
