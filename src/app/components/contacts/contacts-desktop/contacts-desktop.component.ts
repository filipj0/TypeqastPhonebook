import { ChangeDetectorRef, Component } from '@angular/core';
import { ContactsComponent } from '../contacts.component';
import { Router } from '@angular/router';
import { ViewStateService } from '../../../services/view-state.service';
import { SvgService } from '../../../services/svg.service';

@Component({
    selector: 'app-contacts-desktop',
    templateUrl: './contacts-desktop.component.html',
    styleUrls: ['./contacts-desktop.component.scss']
})
export class ContactsDesktopComponent extends ContactsComponent {
    constructor(svgService: SvgService, router: Router, viewStateService: ViewStateService, cd: ChangeDetectorRef) {
        super(svgService, router, viewStateService, cd);
    }
}
