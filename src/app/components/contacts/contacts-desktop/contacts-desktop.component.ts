import { Component } from '@angular/core';
import { ContactsComponent } from '../contacts.component';
import { Router } from '@angular/router';
import { ViewStateService } from '../../../services/view-state.service';

@Component({
    selector: 'app-contacts-desktop',
    templateUrl: './contacts-desktop.component.html',
    styleUrls: ['./contacts-desktop.component.scss']
})
export class ContactsDesktopComponent extends ContactsComponent {
    constructor(router: Router, viewStateService: ViewStateService) {
        super(router, viewStateService);
    }
}
