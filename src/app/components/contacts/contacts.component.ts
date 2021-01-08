import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewStateService } from '../../services/view-state.service';
import { SvgService } from '../../services/svg.service';
import { GlobalService } from '../../services/global.service';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent implements OnInit {
    public isMobileDevice: boolean = false;
    public favoritesMode: boolean = false;
    public showDetailsView: boolean = false;
    public detailsMode: string = null;
    public contacts: Array<Contact> = [];
    public contactsDisplayed: Array<Contact> = [];
    public contactForDetails: Contact = null;
    public contactForDelete: Contact = null;
    public showDeletePrompt: boolean = false;
    public filterContactsQuery: string = null;

    constructor(@Inject(SvgService) public svgService: SvgService,
                @Inject(GlobalService) public globalService: GlobalService,
                private router: Router,
                private viewStateService: ViewStateService,
                private cd: ChangeDetectorRef,
                private api: ApiService) {
        this.isMobileDevice = this.viewStateService.checkIfMobileResolution();
    }

    ngOnInit(): void {
        this.favoritesMode = this.router.url === '/favorites';
        this.loadContacts();
    }

    private detectChanges() {
        if (!this.cd['destroyed']) {
            this.cd.detectChanges();
        }
    }

    private loadContacts() {
        this.filterContacts();
        this.detectChanges();
    }

    public filterContacts() {
        this.contacts = this.api.getContacts();
        let contactsMatchingQuery: Array<Contact> = [];
        if (!this.filterContactsQuery) {
            contactsMatchingQuery = this.contacts;
        }
        else {
            contactsMatchingQuery = this.contacts.filter((contact: Contact) => contact.fullName.toLowerCase().includes(this.filterContactsQuery.toLowerCase()));
        }
        this.contactsDisplayed = this.favoritesMode ? this.filterFavorites(contactsMatchingQuery) : contactsMatchingQuery;
        this.detectChanges();
    }

    filterFavorites(contactList: Array<Contact>) {
        return contactList.filter((contact: Contact) => contact.favorite);
    }

    saveContact(contact: Contact) {
        if (contact.id == null) {
            contact.id = this.generateId();
            this.api.addContact(contact);
        }
        else {
            this.api.updateContact(contact);
        }
        this.filterContacts();
    }

    deleteContactPrompt(contact: Contact) {
        this.contactForDelete = contact;
        this.showDeletePrompt = true;
        this.detectChanges();
    }

    deleteContact(approved: boolean) {
        if (approved) {
            this.api.deleteContact(this.contactForDelete.id);
            this.filterContacts();
        }
        this.showDeletePrompt = false;
        this.showDetailsView = false;
        this.detectChanges();
    }

    toggleFavorite(contactId: number) {
        this.api.toggleFavorite(contactId).subscribe((favorite: boolean) => {
            let contactIndex = this.contactsDisplayed.findIndex((contact: Contact) => contact.id === contactId);
            this.contactsDisplayed[contactIndex].favorite = favorite;
            if (this.favoritesMode && !favorite) {
                this.contactsDisplayed.splice(contactIndex, 1);
            }
            this.detectChanges();
        });
    }

    addNewContact() {
        this.contactForDetails = null;
        this.detailsMode = this.globalService.detailsModes.NEW;
        this.showDetailsView = true;
        this.detectChanges();
    }

    editContact(contact: Contact) {
        this.contactForDetails = contact;
        this.detailsMode = this.globalService.detailsModes.EDIT;
        this.showDetailsView = true;
        this.detectChanges();
    }

    showContactDetails(contact: Contact) {
        this.contactForDetails = contact;
        this.detailsMode = this.globalService.detailsModes.READONLY;
        this.showDetailsView = true;
        this.detectChanges();
    }

    closeContactDetails() {
        this.showDetailsView = false;
        this.detectChanges();
    }

    changeDetailsMode(mode: string) {
        this.detailsMode = mode;
        this.detectChanges();
    }

    generateId(): number {
        if (this.contacts.length === 0) {
            return 0;
        }
        let currentMaxId = Math.max.apply(Math, this.contacts.map((contact: Contact) => {
            return contact.id;
        }));
        return currentMaxId + 1;
    }
}

export class Contact {
    id: number;
    fullName: string;
    email: string;
    phoneNumbers: Array<PhoneNumber>;
    favorite: boolean;
    imageUrl: string;

    constructor() {
        this.id = null;
        this.fullName = null;
        this.email = null;
        this.phoneNumbers = [];
        this.imageUrl = null;
        this.favorite = false;
    }
}

export class PhoneNumber {
    number: string;
    type: string;

    constructor(number: string, type: string) {
        this.number = number;
        this.type = type;
    }
}


