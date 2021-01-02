import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ContactsComponentModel } from './contacts.component.model';
import { Router } from '@angular/router';
import { ViewStateService } from '../../services/view-state.service';
import { SvgService } from '../../services/svg.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent implements OnInit {
    private model: ContactsComponentModel;
    public isMobileDevice: boolean = false;
    public showContactDetails: boolean = false;
    public detailsMode: string = null;
    public detailsModes = {
        READONLY: 'READONLY',
        EDIT: 'EDIT',
        NEW: 'NEW'
    };
    public contacts: Array<Contact> = [];

    constructor(@Inject(SvgService) public svgService: SvgService,
                private router: Router,
                private viewStateService: ViewStateService,
                private cd: ChangeDetectorRef) {
        this.model = new ContactsComponentModel();
        this.isMobileDevice = this.viewStateService.checkIfMobileResolution();
    }

    ngOnInit(): void {
        this.loadContacts();
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
    }

    newContactClick() {
        this.detailsMode = this.detailsModes.NEW;
        this.showContactDetails = true;
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


