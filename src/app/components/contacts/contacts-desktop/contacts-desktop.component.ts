import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Contact, ContactsComponent } from '../contacts.component';
import { Router } from '@angular/router';
import { ViewStateService } from '../../../services/view-state.service';
import { SvgService } from '../../../services/svg.service';
import { GlobalService } from '../../../services/global.service';

@Component({
    selector: 'app-contacts-desktop',
    templateUrl: './contacts-desktop.component.html',
    styleUrls: ['./contacts-desktop.component.scss']
})
export class ContactsDesktopComponent extends ContactsComponent {
    constructor(svgService: SvgService, globalService: GlobalService, router: Router, viewStateService: ViewStateService, cd: ChangeDetectorRef) {
        super(svgService, globalService, router, viewStateService, cd);
    }
}
