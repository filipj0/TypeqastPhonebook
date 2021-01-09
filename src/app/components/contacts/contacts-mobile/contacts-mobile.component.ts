import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SvgService } from '../../../services/svg.service';
import { DetailsService } from '../../../services/details.service';
import { Router } from '@angular/router';
import { ViewStateService } from '../../../services/view-state.service';
import { ApiService } from '../../../services/api.service';
import { ContactsComponent } from '../contacts.component';

@Component({
    selector: 'app-contacts-mobile',
    templateUrl: './contacts-mobile.component.html',
    styleUrls: ['./contacts-mobile.component.scss']
})
export class ContactsMobileComponent extends ContactsComponent {
    constructor(svgService: SvgService, detailsService: DetailsService, router: Router, viewStateService: ViewStateService, cd: ChangeDetectorRef, api: ApiService) {
        super(svgService, detailsService, router, viewStateService, cd, api);
    }
}
