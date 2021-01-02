import { Component } from '@angular/core';
import { ContactsComponentModel } from './contacts.component.model';
import { Router } from '@angular/router';
import { ViewStateService } from '../../services/view-state.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html'
})
export class ContactsComponent {
    private model: ContactsComponentModel;
    public activeViewModel: ContactsComponentModel;
    public isMobileDevice: boolean = false;

    constructor(private router: Router, private viewStateService: ViewStateService) {
        this.model = new ContactsComponentModel();
        this.activeViewModel = new ContactsComponentModel();
        this.isMobileDevice = this.viewStateService.checkIfMobileResolution();
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
