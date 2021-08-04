import {Attribute, Component, HostBinding, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'tui-button',
    templateUrl: './tui-button.component.html'
})
export class TuiButtonComponent implements OnInit {

    @ViewChild('template', {static: true}) template;
    @ViewChild('ink', {static: true}) ink;
    @Input() block = false;
    @Input() depressed = false;
    @Input() disabled = false;
    @Input() floating = false;
    @Input() icon = false;
    @Input() outlined = false;
    @Input() plain = false;
    @Input() raised = false;
    @Input() rounded = false;
    @Input() size = 'md';
    @Input() squared = false;
    @Input() type = 'default';
    @Input() tile = false;

    constructor(@Attribute('class') public rootCssClass: string) {
    }

    ngOnInit(): void {
    }

    @HostBinding('attr.class')
    get cssClass(): string[] {
        const css = [
            'tui-btn',
            'tui-btn-' + this.size,
            'tui-btn-' + this.type,
            this.rootCssClass || '',
            this.disabled !== false ? 'disabled' : '',
        ];
        if (this.outlined !== false) {
            css.push('tui-btn-outlined');
            css.push('tui-text-' + this.type);
        }
        if (this.squared !== false) {
            css.push('tui-btn-squared');
        }
        return css;
    }

    mouseDownEvent($event): void {
        const inkEl = this.ink.nativeElement;
        inkEl.classList.remove('animate');
        inkEl.style.left = ($event.offsetX - inkEl.offsetWidth / 2) + 'px';
        inkEl.style.top = ($event.offsetY - inkEl.offsetHeight / 2) + 'px';
        inkEl.classList.add('animate');
    }

}
