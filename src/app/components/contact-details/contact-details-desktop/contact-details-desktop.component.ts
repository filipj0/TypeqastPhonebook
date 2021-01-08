import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContactDetailsComponent } from '../contact-details.component';
import { DetailsService } from '../../../services/details.service';
import { SvgService } from '../../../services/svg.service';
import { ApiService } from '../../../services/api.service';
import { Location } from '@angular/common';
import { ViewStateService } from '../../../services/view-state.service';
import { GlobalService } from '../../../services/global.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-contact-details-desktop',
    templateUrl: './contact-details-desktop.component.html',
    styleUrls: ['./contact-details-desktop.component.scss']
})
export class ContactDetailsDesktopComponent extends ContactDetailsComponent {
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
