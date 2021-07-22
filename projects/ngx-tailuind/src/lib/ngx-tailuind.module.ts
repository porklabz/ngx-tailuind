import {NgModule} from '@angular/core';
import {NgxTailuindComponent} from './ngx-tailuind.component';
import {TuiButtonComponent} from './tui-button/tui-button.component';

export {TuiButtonComponent} from './tui-button/tui-button.component';

@NgModule({
    declarations: [NgxTailuindComponent, TuiButtonComponent],
    imports: [],
    exports: [NgxTailuindComponent, TuiButtonComponent]
})
export class NgxTailuindModule {
}
