import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactsDesktopComponent } from './components/contacts/contacts-desktop/contacts-desktop.component';
import { ContactsMobileComponent } from './components/contacts/contacts-mobile/contacts-mobile.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactsDesktopComponent,
    ContactsMobileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
