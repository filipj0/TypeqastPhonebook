import { Component, OnInit } from '@angular/core';
import { ViewStateService } from './services/view-state.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public isMobileDevice: boolean = false;
    public activeOption: string;

    constructor(private viewStateService: ViewStateService, private router: Router) {
        this.isMobileDevice = this.viewStateService.checkIfMobileResolution();
    }

    ngOnInit() {
        setTimeout(() => {
            this.activeOption = this.router.url.substr(1);
        });
    }
}
