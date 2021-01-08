import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Contact, PhoneNumber } from '../contacts/contacts.component';
import { FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DetailsService } from '../../services/details.service';
import { SvgService } from '../../services/svg.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ViewStateService } from '../../services/view-state.service';
import { GlobalService } from '../../services/global.service';

@Component({
    selector: 'app-contact-details',
    templateUrl: './contact-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsComponent implements OnInit {
    public contact: Contact = null;
    public form: FormGroup;
    public showFormValidationErrors: boolean = false;
    public imageUrl: string = null;
    public imageUrlInput: string = '';
    public showImageUrlInput: boolean = false;
    public showImageUrlInputError: boolean = false;
    public imageUploadEnabled: boolean = false;
    public showDeletePrompt: boolean = false;
    public isMobileDevice: boolean = false;

    constructor(@Inject(DetailsService) public detailsService: DetailsService,
                @Inject(SvgService) public svgService: SvgService,
                private cd: ChangeDetectorRef,
                private viewStateService: ViewStateService,
                private globalService: GlobalService,
                private api: ApiService,
                public location: Location,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const routeParams = this.route.snapshot.paramMap;
        const contactIdFromRoute = Number(routeParams.get('id'));

        this.isMobileDevice = this.viewStateService.checkIfMobileDevice();
        if (this.detailsService.detailsMode === null) {
            if (contactIdFromRoute) {
                this.detailsService.detailsMode = this.detailsService.detailsModes.READONLY;
            }
            else {
                this.detailsService.detailsMode = this.detailsService.detailsModes.NEW;
            }
        }

        if (this.detailsService.detailsMode !== this.detailsService.detailsModes.NEW) {
            this.contact = this.api.getContactDetails(contactIdFromRoute);
        }

        this.imageUrl = this.contact ? this.contact.imageUrl : null;
        this.imageUploadEnabled = this.detailsService.detailsMode !== this.detailsService.detailsModes.READONLY;
        if (this.detailsService.detailsMode !== this.detailsService.detailsModes.READONLY) {
            this.initForm();
        }
        this.detectChanges();
    }

    private detectChanges() {
        if (!this.cd['destroyed']) {
            this.cd.detectChanges();
        }
    }

    initForm() {
        this.form = new FormGroup({
            fullName: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, CustomValidators.email]),
            phoneNumbers: new FormArray([])
        });
        if (this.detailsService.detailsMode === this.detailsService.detailsModes.EDIT) {
            this.fullNameControl.setValue(this.contact.fullName);
            this.emailControl.setValue(this.contact.email);
            this.contact.phoneNumbers.forEach((phoneNumber: PhoneNumber) => {
                this.addPhoneNumber(phoneNumber.number, phoneNumber.type);
            });
        }
    }

    enterEditMode() {
        this.detailsService.detailsMode = this.detailsService.detailsModes.EDIT;
        this.imageUploadEnabled = true;
        this.initForm();
        this.detectChanges();
    }

    enterReadOnlyMode() {
        this.detailsService.detailsMode = this.detailsService.detailsModes.READONLY;
        this.imageUploadEnabled = false;
        this.detectChanges();
    }

    addPhoneNumber(number: string = '', type: string = '') {
        (<FormArray> this.form.get('phoneNumbers')).push(new FormGroup({
            number: new FormControl(number, [Validators.required, CustomValidators.phoneNumber]),
            type: new FormControl(type, Validators.required)
        }));
    }

    removePhoneNumber(index: number) {
        (<FormArray> this.form.get('phoneNumbers')).removeAt(index);
    }

    saveChanges(form: FormGroup) {
        this.showFormValidationErrors = !form.valid;
        this.detectChanges();
        if (form.valid) {
            if (this.detailsService.detailsMode === this.detailsService.detailsModes.NEW) {
                this.contact = new Contact();
            }
            this.contact.id = this.detailsService.detailsMode === this.detailsService.detailsModes.NEW ? null : this.contact.id;
            this.contact.fullName = this.fullNameControl.value;
            this.contact.email = this.emailControl.value;
            this.contact.imageUrl = this.imageUrl;
            this.contact.phoneNumbers = [];
            this.phoneNumbersArrayControl.forEach((phoneNumberCtrl: FormGroup) => {
                this.contact.phoneNumbers.push(new PhoneNumber(phoneNumberCtrl.controls.number.value, phoneNumberCtrl.controls.type.value));
            });
            this.detailsService.saveContact(this.contact);
            this.globalService.showToastSubject.next(this.detailsService.detailsMode === this.detailsService.detailsModes.NEW ? 'New contact ' + this.contact.fullName + ' has been created successfully' : 'Changes have been saved');
            this.enterReadOnlyMode();
        }
    }

    cancelChanges() {
        if (this.detailsService.detailsMode === this.detailsService.detailsModes.NEW) {
            this.location.back();
        }
        else {
            this.enterReadOnlyMode();
        }
    }

    toggleImageUrlInputPopup(show: boolean) {
        if (show) {
            this.showImageUrlInputError = false;
            this.imageUrlInput = this.imageUrl;
        }
        this.showImageUrlInput = show;
        this.detectChanges();
    }

    saveImageUrl() {
        if (this.imageUrlInput === '' || this.imageUrlInput == null) {
            this.showImageUrlInputError = true;
            this.detectChanges();
            return false;
        }
        this.imageUrl = this.imageUrlInput;
        this.toggleImageUrlInputPopup(false);
    }

    toggleFavorite(contactId: number) {
        this.api.toggleFavorite(contactId).subscribe((favorite: boolean) => {
            this.contact.favorite = favorite;
            this.detectChanges();
        });
    }

    get fullNameControl() {
        return this.form.get('fullName');
    }

    get emailControl() {
        return this.form.get('email');
    }

    get phoneNumbersArrayControl(): Array<FormGroup> {
        return this.form.get('phoneNumbers')['controls'];
    }
}

class CustomValidators {
    static email(formControl: FormControl): ValidationErrors {
        const isValid = (/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm.test(formControl.value));
        const error = {
            invalidFormat: 'Email address format is not valid.'
        };
        return isValid ? null : error;
    }

    static phoneNumber(formControl: FormControl): ValidationErrors {
        let isValid = (/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/.test(formControl.value));
        const error = {
            invalidFormat: 'Phone number format is not valid.'
        };
        return isValid ? null : error;
    }
}
