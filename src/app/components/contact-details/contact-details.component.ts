import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Contact, PhoneNumber } from '../contacts/contacts.component';
import { FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { SvgService } from '../../services/svg.service';
import { LocationStrategy } from '@angular/common';

@Component({
    selector: 'app-contact-details',
    templateUrl: './contact-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsComponent implements OnInit {
    @Input() contact: Contact;
    @Input() mode: string;
    @Input() isMobileDevice: boolean;

    @Output() closeDetailsEmitter = new EventEmitter();
    @Output() modeChangeEmitter = new EventEmitter();
    @Output() saveContactEmitter = new EventEmitter<Contact>();
    @Output() generateIdEmitter = new EventEmitter<Contact>();
    @Output() deletePromptEmitter = new EventEmitter<Contact>();
    @Output() toggleFavoriteEmitter = new EventEmitter<number>();

    public form: FormGroup;
    public showFormValidationErrors: boolean = false;
    public imageUrl: string = null;
    public imageUrlInput: string = '';
    public showImageUrlInput: boolean = false;
    public showImageUrlInputError: boolean = false;
    public imageUploadEnabled: boolean = true;

    constructor(@Inject(GlobalService) public globalService: GlobalService,
                @Inject(SvgService) public svgService: SvgService,
                private cd: ChangeDetectorRef,
                private location: LocationStrategy) {
        history.pushState(null, null, window.location.href);
        this.location.onPopState(() => {
            this.closeDetailsEmitter.emit();
        });
    }

    ngOnInit(): void {
        this.imageUrl = this.contact ? this.contact.imageUrl : null;
        this.imageUploadEnabled = this.mode !== this.globalService.detailsModes.READONLY;
        if (this.mode !== this.globalService.detailsModes.READONLY) {
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
        if (this.mode === this.globalService.detailsModes.EDIT) {
            this.fullNameControl.setValue(this.contact.fullName);
            this.emailControl.setValue(this.contact.email);
            this.contact.phoneNumbers.forEach((phoneNumber: PhoneNumber) => {
                this.addPhoneNumber(phoneNumber.number, phoneNumber.type);
            });
        }
    }

    enterEditMode() {
        this.mode = this.globalService.detailsModes.EDIT;
        this.initForm();
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
            if (this.mode === this.globalService.detailsModes.NEW) {
                this.contact = new Contact();
            }
            this.contact.id = this.mode === this.globalService.detailsModes.NEW ? null : this.contact.id;
            this.contact.fullName = this.fullNameControl.value;
            this.contact.email = this.emailControl.value;
            this.contact.imageUrl = this.imageUrl;
            this.contact.phoneNumbers = [];
            this.phoneNumbersArrayControl.forEach((phoneNumberCtrl: FormGroup) => {
                this.contact.phoneNumbers.push(new PhoneNumber(phoneNumberCtrl.controls.number.value, phoneNumberCtrl.controls.type.value));
            });
            console.log(this.contact);
            this.saveContactEmitter.emit(this.contact);
            this.closeDetailsEmitter.emit();
        }
    }

    cancelChanges() {
        if (this.mode === this.globalService.detailsModes.NEW) {
            this.closeDetailsEmitter.emit();
        }
        else {
            this.modeChangeEmitter.emit(this.globalService.detailsModes.READONLY);
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
