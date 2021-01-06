import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    public detailsModes = {
        READONLY: 'READONLY',
        EDIT: 'EDIT',
        NEW: 'NEW'
    };

    constructor() {
    }
}
