import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewStateService } from '../../../services/view-state.service';

@Component({
    selector: 'app-upload-image-popup',
    templateUrl: './upload-image-popup.component.html',
    styleUrls: ['./upload-image-popup.component.scss']
})
export class UploadImagePopupComponent {
    @Input() imageUrlInput: string;

    @Output() closeEmitter = new EventEmitter();
    @Output() saveEmitter = new EventEmitter();

    public isMobileDevice: boolean = false;
    public showError: boolean = false;

    constructor(private viewStateService: ViewStateService) {
        this.isMobileDevice = this.viewStateService.checkIfMobileDevice();
    }

    saveImageUrl() {
        if (this.imageUrlInput === '' || this.imageUrlInput == null) {
            this.showError = true;
            return false;
        }
        this.saveEmitter.emit(this.imageUrlInput);
        this.closeEmitter.emit();
    }
}
