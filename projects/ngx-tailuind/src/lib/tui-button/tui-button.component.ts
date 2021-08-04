import {Attribute, Component, HostBinding, Input, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'tui-button',
    templateUrl: './tui-button.component.html',
    styles: [':host:not([block]) { display: inline-block; }']
})
export class TuiButtonComponent implements OnInit {

    @ViewChild('template', {static: true}) template;
    @ViewChild('ink', {static: true}) ink;
    // @TODO Loaders
    @Input() block = false;
    @Input() depressed = false;
    @Input() disabled = false;
    @Input() elevation = 'lg';
    @Input() fab = false;
    @Input() icon = false;
    @Input() outlined = false;
    @Input() plain = false;
    @Input() raised = false;
    @Input() rounded = false;
    @Input() size = 'md';
    @Input() squared = false;
    @Input() type = 'default';
    @Input() text = false;

    constructor(
                @Attribute('class') public rootCssClass: string) {
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
            this.elevation ? 'shadow-' + this.elevation : '',
        ];
        if (this.outlined !== false) {
            css.push('tui-btn-outlined');
            css.push('tui-text-' + this.type);
        }
        if (this.squared !== false) {
            css.push('tui-btn-squared');
        }
        if (this.rounded !== false) {
            css.push('tui-btn-rounded');
        }
        if (this.block !== false) {
            css.push('block');
        }
        if (this.icon !== false) {
            this.text = true;
            css.push('rounded-full shadow-none');
            css.push('tui-btn-icon');
        }
        if (this.fab !== false) {
            css.push('rounded-full shadow-none');
            css.push('tui-btn-fab');
        }
        if (this.plain !== false) {
            this.depressed = true;
            css.push('tui-btn-plain');
            css.push('tui-text-' + this.type + '-base');
        }
        if (this.text !== false) {
            css.push('tui-btn-text');
            css.push('shadow-none');
            css.push('hover:tui-' + this.type + '-clean');
            css.push('tui-text-' + this.type + '-base');
        }
        if (this.depressed !== false) {
            css.push('shadow-none');
        }
        if (this.raised !== false) {
            css.push('hover:shadow-xl');
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
