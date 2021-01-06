import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../contacts/contacts.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { SvgService } from '../../services/svg.service';

@Component({
    selector: 'app-contact-details',
    templateUrl: './contact-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsComponent {
    @Input() contact: Contact;
    @Input() mode: string;
    @Input() isMobileDevice: boolean;

    @Output() closeDetailsEmitter = new EventEmitter();

    public form: FormGroup;

    constructor(@Inject(GlobalService) public globalService: GlobalService,
                @Inject(SvgService) public svgService: SvgService,
                private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
                firstName: '',
                lastName: '',
                email: '',
                imageUrl: '',
                phoneNumbers: []
            }
        );
    }
}
