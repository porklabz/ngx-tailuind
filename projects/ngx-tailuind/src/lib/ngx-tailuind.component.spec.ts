import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxTailuindComponent} from './ngx-tailuind.component';

describe('NgxTailuindComponent', () => {
    let component: NgxTailuindComponent;
    let fixture: ComponentFixture<NgxTailuindComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NgxTailuindComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxTailuindComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
