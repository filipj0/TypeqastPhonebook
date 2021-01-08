import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactsDesktopComponent } from './components/contacts/contacts-desktop/contacts-desktop.component';
import { ContactsMobileComponent } from './components/contacts/contacts-mobile/contacts-mobile.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { SvgService } from './services/svg.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ImageLoadDirective } from './directives/img-load.directive';
import { ContactDetailsDesktopComponent } from './components/contact-details/contact-details-desktop/contact-details-desktop.component';
import { ContactDetailsMobileComponent } from './components/contact-details/contact-details-mobile/contact-details-mobile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';
import { StopClickPropagationDirective } from './directives/stop-click-propagation';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
    declarations: [
        AppComponent,
        ContactsComponent,
        ContactsDesktopComponent,
        ContactsMobileComponent,
        ContactDetailsComponent,
        ImageLoadDirective,
        StopClickPropagationDirective,
        ContactDetailsDesktopComponent,
        ContactDetailsMobileComponent,
        DeletePopupComponent,
        ToastComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        HttpClient,
        SvgService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
