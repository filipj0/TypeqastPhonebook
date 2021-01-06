import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContactDetailsComponent } from '../contact-details.component';
import { GlobalService } from '../../../services/global.service';
import { SvgService } from '../../../services/svg.service';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-contact-details-desktop',
    templateUrl: './contact-details-desktop.component.html',
    styleUrls: ['./contact-details-desktop.component.scss']
})
export class ContactDetailsDesktopComponent extends ContactDetailsComponent {
    constructor(globalService: GlobalService, svgService: SvgService, cd: ChangeDetectorRef, api: ApiService) {
        super(globalService, svgService, cd, api);
    }
}
