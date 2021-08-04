import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'demo';
    tipos = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link'];
    loading = false;

    setLoading(): void {
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 2000);
    }
}
