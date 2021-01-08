import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[stop-click-propagation]'
})
export class StopClickPropagationDirective {
    @HostListener('click', ['$event'])
    @HostListener('mouseup', ['$event'])
    public onClick(event: any): void {
        event.stopImmediatePropagation();
    }

    public onMouseUp(event: any): void {
        event.stopImmediatePropagation();
    }
}
