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

@NgModule({
    declarations: [
        AppComponent,
        ContactsComponent,
        ContactsDesktopComponent,
        ContactsMobileComponent,
        ContactDetailsComponent,
        ImageLoadDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        HttpClient,
        SvgService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
