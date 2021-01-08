import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../contacts/contacts.component';
import { DetailsService } from '../../services/details.service';

@Component({
    selector: 'app-delete-popup',
    templateUrl: './delete-popup.component.html',
    styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent {
    @Input() contact: Contact;

    @Output() closeEmitter = new EventEmitter();

    constructor(public detailsService: DetailsService) {
    }

    delete() {
        this.detailsService.deleteContact(this.contact.id);
        this.closeEmitter.emit();
    }
}
