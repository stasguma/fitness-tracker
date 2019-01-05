import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './../../auth/auth.service';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
    @Output() closeSidenav: EventEmitter<any> = new EventEmitter();
    isAuth: boolean;
    authSubscription: Subscription;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authSubscription = this.authService.authChange.subscribe((authStatus) => {
            this.isAuth = authStatus;
        });
    }

    onCloseSidenav() {
        this.closeSidenav.emit();
    }

    ngOnDestroy() {
        this.authSubscription && this.authSubscription.unsubscribe();
    }

    onLogout() {
        this.authService.logout();
        this.onCloseSidenav();
    }
}
