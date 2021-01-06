import { Component, OnInit } from '@angular/core';
import { ContactDetailsComponent } from '../contact-details.component';
import { FormBuilder } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';
import { SvgService } from '../../../services/svg.service';

@Component({
    selector: 'app-contact-details-desktop',
    templateUrl: './contact-details-desktop.component.html',
    styleUrls: ['./contact-details-desktop.component.scss']
})
export class ContactDetailsDesktopComponent extends ContactDetailsComponent {
    constructor(globalService: GlobalService, svgService: SvgService, formBuilder: FormBuilder) {
        super(globalService, svgService, formBuilder);
    }
}
