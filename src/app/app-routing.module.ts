import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { ContactsDesktopComponent } from './components/contacts/contacts-desktop/contacts-desktop.component';
import { ContactsMobileComponent } from './components/contacts/contacts-mobile/contacts-mobile.component';
import { ViewStateService } from './services/view-state.service';


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
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routesDesktop)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    constructor(private router: Router, private viewStateService: ViewStateService) {
        if (this.viewStateService.checkIfMobileResolution()) {
            router.resetConfig(routesMobile);
        }
    }
}
