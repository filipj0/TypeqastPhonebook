import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { ContactsDesktopComponent } from './components/contacts/contacts-desktop/contacts-desktop.component';
import { ContactsMobileComponent } from './components/contacts/contacts-mobile/contacts-mobile.component';
import { ViewStateService } from './services/view-state.service';
import { ContactDetailsDesktopComponent } from './components/contact-details/contact-details-desktop/contact-details-desktop.component';
import { ContactDetailsMobileComponent } from './components/contact-details/contact-details-mobile/contact-details-mobile.component';


const routesDesktop: Routes = [
    { path: '', redirectTo: '/contacts', pathMatch: 'full' },
    {
        path: 'contacts',
        component: ContactsDesktopComponent
    },
    {
        path: 'favorites',
        component: ContactsDesktopComponent
    },
    {
        path: 'details/:id',
        component: ContactDetailsDesktopComponent
    },
    {
        path: 'details',
        component: ContactDetailsDesktopComponent
    },
    { path: '**', redirectTo: '' }
];

const routesMobile: Routes = [
    { path: '', redirectTo: '/contacts', pathMatch: 'full' },
    {
        path: 'contacts',
        component: ContactsMobileComponent
    },
    {
        path: 'favorites',
        component: ContactsMobileComponent
    },
    {
        path: 'details/:id',
        component: ContactDetailsMobileComponent
    },
    {
        path: 'details',
        component: ContactDetailsMobileComponent
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routesDesktop)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    constructor(private router: Router, private viewStateService: ViewStateService) {
        if (this.viewStateService.checkIfMobileDevice()) {
            router.resetConfig(routesMobile);
        }
    }
}
