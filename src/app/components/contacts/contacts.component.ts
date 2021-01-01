import { Component, OnInit } from '@angular/core';
import { ContactsComponentModel } from './contacts.component.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html'
})
export class ContactsComponent {
    private model: ContactsComponentModel;
    public activeViewModel: ContactsComponentModel;

    constructor() {
        this.model = new ContactsComponentModel();
        this.activeViewModel = new ContactsComponentModel();
    }
}
