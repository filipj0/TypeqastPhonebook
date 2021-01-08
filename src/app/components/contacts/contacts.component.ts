import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewStateService } from '../../services/view-state.service';
import { SvgService } from '../../services/svg.service';
import { DetailsService } from '../../services/details.service';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent implements OnInit, OnDestroy {
    private refreshContactListSubscription: Subscription;

    public isMobileDevice: boolean = false;
    public favoritesMode: boolean = false;
    public contacts: Array<Contact> = [];
    public contactsDisplayed: Array<Contact> = [];
    public contactForDelete: Contact = null;
    public showDeletePrompt: boolean = false;
    public filterContactsQuery: string = null;

    constructor(@Inject(SvgService) public svgService: SvgService,
                @Inject(DetailsService) public detailsService: DetailsService,
                private router: Router,
                private viewStateService: ViewStateService,
                private cd: ChangeDetectorRef,
                private api: ApiService) {
        this.isMobileDevice = this.viewStateService.checkIfMobileDevice();
    }

    ngOnInit(): void {
        this.refreshContactListSubscription = this.detailsService.refreshContactListSubjectObservable.subscribe(() => this.filterContacts());
        this.favoritesMode = this.router.url === '/favorites';
        this.filterContacts();
    }

    ngOnDestroy(): void {
        this.refreshContactListSubscription.unsubscribe();
    }

    private detectChanges() {
        if (!this.cd['destroyed']) {
            this.cd.detectChanges();
        }
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

    private filterFavorites(contactList: Array<Contact>) {
        return contactList.filter((contact: Contact) => contact.favorite);
    }

    deleteContactPrompt(contact: Contact) {
        this.contactForDelete = contact;
        this.showDeletePrompt = true;
        this.detectChanges();
    }

    toggleFavorite(contactId: number) {
        this.api.toggleFavorite(contactId).subscribe((favorite: boolean) => {
            if (!this.favoritesMode) {
                this.contactsDisplayed.find((contact: Contact) => contact.id === contactId).favorite = favorite;
                this.detectChanges();
            }
            else {
                let contactIndex = this.contactsDisplayed.findIndex((contact: Contact) => contact.id === contactId);
                this.contactsDisplayed.splice(contactIndex, 1);
                this.detectChanges();
            }
        });
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


