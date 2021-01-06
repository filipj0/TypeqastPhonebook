import { Injectable } from '@angular/core';
import { Contact } from '../components/contacts/contacts.component';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor() {
    }

    getContacts() {
        return JSON.parse(localStorage['contacts']);
    }

    addContact(contact: Contact) {
        let contacts = this.getContacts();
        if (!contacts) {
            contacts = [];
        }
        contacts.push(contact);
        localStorage['contacts'] = JSON.stringify(contacts);
    }
}
