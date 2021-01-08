import { Injectable } from '@angular/core';
import { Contact } from '../components/contacts/contacts.component';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor() {
    }

    getContacts(): Array<Contact> {
        let contactsList = localStorage['contacts'];
        return !contactsList ? [] : JSON.parse(contactsList);
    }

    addContact(contact: Contact) {
        let contacts = this.getContacts();
        if (!contacts) {
            contacts = [];
        }
        contacts.push(contact);
        localStorage['contacts'] = JSON.stringify(contacts);
    }

    updateContact(contactUpdate: Contact) {
        let contacts: Array<Contact> = this.getContacts();
        let contactIndex: number = contacts.findIndex((contact: Contact) => contact.id === contactUpdate.id);
        contacts[contactIndex] = contactUpdate;
        localStorage['contacts'] = JSON.stringify(contacts);
    }

    deleteContact(contactId: number) {
        let contacts: Array<Contact> = this.getContacts();
        let contactIndex: number = contacts.findIndex((contact: Contact) => contact.id === contactId);
        contacts.splice(contactIndex, 1);
        localStorage['contacts'] = JSON.stringify(contacts);
    }

    toggleFavorite(contactId: number) {
        let contacts: Array<Contact> = this.getContacts();
        let contactIndex: number = contacts.findIndex((contact: Contact) => contact.id === contactId);
        contacts[contactIndex].favorite = !contacts[contactIndex].favorite;
        localStorage['contacts'] = JSON.stringify(contacts);
        return of(contacts[contactIndex].favorite);
    }

    getContactDetails(contactId: number): Contact {
        let contacts: Array<Contact> = this.getContacts();
        return contacts.find((contact: Contact) => contact.id === contactId);
    }
}
