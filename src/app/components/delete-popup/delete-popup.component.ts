import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../contacts/contacts.component';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-delete-popup',
    templateUrl: './delete-popup.component.html',
    styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent {
    @Input() contact: Contact;

    @Output() deleteEmitter = new EventEmitter<boolean>();

    constructor() {
    }
}
