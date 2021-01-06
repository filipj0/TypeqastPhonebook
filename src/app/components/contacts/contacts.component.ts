import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewStateService } from '../../services/view-state.service';
import { SvgService } from '../../services/svg.service';
import { GlobalService } from '../../services/global.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent implements OnInit {
    public isMobileDevice: boolean = false;
    public showDetailsView: boolean = false;
    public detailsMode: string = null;
    public contacts: Array<Contact> = [];
    public contactForDetails: Contact = null;

    constructor(@Inject(SvgService) public svgService: SvgService,
                @Inject(GlobalService) public globalService: GlobalService,
                private router: Router,
                private viewStateService: ViewStateService,
                private cd: ChangeDetectorRef) {
        this.isMobileDevice = this.viewStateService.checkIfMobileResolution();
    }

    ngOnInit(): void {
        if (this.router.url === '/contacts') {
            this.loadContacts();
        }
        else {
            this.loadFavorites();
        }
    }

    private detectChanges() {
        if (!this.cd['destroyed']) {
            this.cd.detectChanges();
        }
    }

    private loadContacts() {
        this.contacts = [];
        let phoneNumbers = [new PhoneNumber('555-1234', 'HOME'), new PhoneNumber('555-5678', 'WORK')];
        let contact1 = new Contact(0, 'Brodie', 'Lee', 'brodielee@aew.com', phoneNumbers, 'https://site-cdn.givemesport.com/images/20/12/27/c5ea07fab6cc850d07e6c53d02e2d8e7/1201.jpg');
        let contact2 = new Contact(1, 'Luke', 'Harper', 'lukeharper@wwe.com', phoneNumbers, 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Luke_Harper_April_2015.jpg');
        contact2.favorite = true;
        let contact3 = new Contact(2, 'Jon', 'Huber', 'jonhuber@gmail.com', phoneNumbers, 'https://akns-images.eonline.com/eol_images/Entire_Site/20201127/rs_1024x759-201227091535-1024-Luke-Harper-Brodie-Lee.cm.122720.jpg');
        this.contacts = [contact1, contact2, contact3];
        this.detectChanges();
        this.showContactDetails(null);
    }

    private loadFavorites() {
        this.contacts = [];
        let phoneNumbers = [new PhoneNumber('555-1234', 'HOME'), new PhoneNumber('555-5678', 'WORK')];
        let contact2 = new Contact(1, 'Luke', 'Harper', 'lukeharper@wwe.com', phoneNumbers, 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Luke_Harper_April_2015.jpg');
        contact2.favorite = true;
        this.contacts = [contact2];
        this.detectChanges();
    }

    addNewContact() {
        this.detailsMode = this.globalService.detailsModes.NEW;
        this.showDetailsView = true;
        this.detectChanges();
    }

    showContactDetails(contact: Contact) {
        this.contactForDetails = contact;
        let phoneNumbers = [new PhoneNumber('555-1234', 'HOME'), new PhoneNumber('555-5678', 'WORK')];
        this.contactForDetails = new Contact(1, 'Luke', 'Harper', 'lukeharper@wwe.com', phoneNumbers, 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Luke_Harper_April_2015.jpg');
        this.detailsMode = this.globalService.detailsModes.READONLY;
        this.showDetailsView = true;
        this.detectChanges();
    }

    closeContactDetails() {
        this.showDetailsView = false;
        this.detectChanges();
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

    constructor(id: number, firstName: string, lastName: string, email: string, phoneNumbers: Array<PhoneNumber>, imageUrl: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumbers = phoneNumbers;
        this.imageUrl = imageUrl;
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


