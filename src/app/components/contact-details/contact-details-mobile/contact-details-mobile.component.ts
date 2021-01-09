import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContactDetailsComponent } from '../contact-details.component';
import { DetailsService } from '../../../services/details.service';
import { SvgService } from '../../../services/svg.service';
import { ViewStateService } from '../../../services/view-state.service';
import { GlobalService } from '../../../services/global.service';
import { ApiService } from '../../../services/api.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-contact-details-mobile',
    templateUrl: './contact-details-mobile.component.html',
    styleUrls: ['./contact-details-mobile.component.scss']
})
export class ContactDetailsMobileComponent extends ContactDetailsComponent {
    constructor(detailsService: DetailsService,
                svgService: SvgService,
                cd: ChangeDetectorRef,
                viewStateService: ViewStateService,
                globalService: GlobalService,
                api: ApiService,
                location: Location,
                route: ActivatedRoute) {
        super(detailsService, svgService, cd, viewStateService, globalService, api, location, route);
    }
}
