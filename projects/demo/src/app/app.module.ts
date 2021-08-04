import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxTailuindModule} from 'ngx-tailuind';
// import {NgxTailuindModule} from '../../../ngx-tailuind/src/lib/ngx-tailuind.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxTailuindModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
