import { Component, OnInit } from '@angular/core';
import { ContactsComponentModel } from './contacts.component.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html'
})
export class ContactsComponent {
    private model: ContactsComponentModel;
    public activeViewModel: ContactsComponentModel;
    testMsg: any;

    constructor(private router: Router) {
        this.model = new ContactsComponentModel();
        this.activeViewModel = new ContactsComponentModel();
        this.testMsg = this.router.url === '/contacts' ? 'Contacts' : 'Favorites';
    }
}

export class Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumbers: Array<PhoneNumber>;
    favorite: boolean;
    imageUrl: string;

    constructor(id: number, firstName: string, lastName: string, email: string, phoneNumbers: Array<PhoneNumber>) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumbers = phoneNumbers;
    }
}

export class PhoneNumber {
    number: string;
    type: string;
}
