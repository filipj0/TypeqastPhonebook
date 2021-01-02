import { Directive, ElementRef, OnChanges, SimpleChanges, Input } from '@angular/core';

declare var $: any;

@Directive({
    selector: '[imgLoad]'
})
export class ImageLoadDirective implements OnChanges {
    @Input() imageUrl: string = null;

    constructor(private elRef: ElementRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        setTimeout(() => {
            // let $img = $(this.elRef.nativeElement);
            let imgEl = this.elRef.nativeElement;
            // $img.removeClass('loaded vertical-align horizontal-align');
            imgEl.classList.remove('loaded', 'vertical-align', 'horizontal-align');
            setTimeout(() => {
                if (this.imageUrl && this.imageUrl !== '') {
                    /*$img.on('load', () => {
                        let imgWidth = $img.width();
                        let imgHeight = $img.height();
                        if (imgWidth > imgHeight) {
                            $img.addClass('horizontal-align');
                        }
                        else {
                            $img.addClass('vertical-align');
                        }
                        $img.addClass('loaded');
                    });
                    $img.attr('src', this.imageUrl);*/

                    imgEl.addEventListener('load', () => {
                        let imgWidth = imgEl.offsetWidth;
                        let imgHeight = imgEl.offsetHeight;
                        if (imgWidth > imgHeight) {
                            imgEl.classList.add('horizontal-align');
                        }
                        else {
                            imgEl.classList.add('vertical-align');
                        }
                        imgEl.classList.add('loaded');
                    });
                    imgEl.src = this.imageUrl;
                }
            });
        });
    }
}
