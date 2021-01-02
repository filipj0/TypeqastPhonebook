import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class SvgService {
    public svgsLoaded: boolean = false;
    public svgs: any = {};
    public svgKeys: any = {
        FAV_ICON: 'fav_icon',
        FAV_FULL_ICON: 'fav_full_icon',
        EDIT_ICON: 'edit_icon',
        DELETE_ICON: 'delete_icon'
    };

    constructor(private http: HttpClient, private domSanitizer: DomSanitizer) {
        this.prepareSvgs();
    }

    public prepareSvgs() {
        Object.keys(this.svgKeys).forEach((key: string) => {
            let value = this.svgKeys[key];
            let svgUrl = 'assets/svg/' + value + '.svg';
            this.http.get(svgUrl, { responseType: 'text' }).subscribe(
                (result: any) => {
                    this.svgs[value] = this.domSanitizer.bypassSecurityTrustHtml(result);
                    if (Object.keys(this.svgs).length === Object.keys(this.svgKeys).length) {
                        this.svgsLoaded = true;
                    }
                },
                error => {
                    this.svgs[value] = null;
                    if (Object.keys(this.svgs).length === Object.keys(this.svgKeys).length) {
                        this.svgsLoaded = true;
                    }
                }
            );
        });
    }

    public getSvg(key: string) {
        console.log('get svg', key);
        return this.svgs[key];
    }
}
