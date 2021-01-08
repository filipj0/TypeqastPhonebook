import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public showToastSubject = new Subject<any>();
  public showToastSubjectObservable = this.showToastSubject.asObservable();

  constructor() { }
}
