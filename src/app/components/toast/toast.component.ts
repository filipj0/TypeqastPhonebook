import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../services/global.service';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
    private showToastSubscription: Subscription;

    private timeout: any = null;
    public opened: boolean = false;
    public message: string = null;

    constructor(private globalService: GlobalService) {
    }

    ngOnInit(): void {
        this.showToastSubscription = this.globalService.showToastSubjectObservable.subscribe((message) => this.showMessage(message));
    }

    public showMessage(message: string) {
        if (this.timeout != null) {
            clearTimeout(this.timeout);
        }
        this.message = message;
        this.opened = true;
        this.timeout = setTimeout(() => {
            this.opened = false;
        }, 5000);
    }

    closeToast() {
        clearTimeout(this.timeout);
        this.opened = false;
    }
}
