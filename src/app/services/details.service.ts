import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from './api.service';
import { Contact } from '../components/contacts/contacts.component';
import { Subject } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
    providedIn: 'root'
})
export class DetailsService {
    public refreshContactListSubject = new Subject<any>();
    public refreshContactListSubjectObservable = this.refreshContactListSubject.asObservable();

    public detailsModes = {
        READONLY: 'READONLY',
        EDIT: 'EDIT',
        NEW: 'NEW'
    };
    public detailsMode: string = null;

    constructor(private router: Router,
                private api: ApiService,
                private location: Location,
                private globalService: GlobalService) {
    }

    public openDetails(contactId: number, mode: string) {
        this.detailsMode = mode;
        if (contactId) {
            this.router.navigate(['/details', contactId]);
        }
        else {
            this.router.navigate(['details']);
        }
    }

    public saveContact(contact: Contact) {
        if (contact.id == null) {
            contact.id = this.generateId();
            this.api.addContact(contact);
        }
        else {
            this.api.updateContact(contact);
        }
    }

    public deleteContact(contactId: number) {
        this.api.deleteContact(contactId);
        this.globalService.showToastSubject.next('Contact has been deleted');
        if (this.router.url.toString().includes('details')) {
            this.location.back();
        }
        else {
            this.refreshContactListSubject.next();
        }
    }

    private generateId(): number {
        let contacts = this.api.getContacts();
        if (contacts.length === 0) {
            return 0;
        }
        let currentMaxId = Math.max.apply(Math, contacts.map((contact: Contact) => {
            return contact.id;
        }));
        return currentMaxId + 1;
    }
}
