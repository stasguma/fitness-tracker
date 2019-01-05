import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService
    ) { }

    initAuthListener() {
        this.afAuth.authState.subscribe((user) => {
            if(user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training'])
            } else {
                this.trainingService.cancelSubsctiptions();
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(['/login'])
            }
        });
    }

    registerUser(authData: AuthData) {
        this.uiService.loadingStateChange.next(true);
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then((result) => {
                this.uiService.loadingStateChange.next(false);
                console.log(result);
            })
            .catch((error) => {
                this.uiService.loadingStateChange.next(false);
                this.uiService.showMessage(error.message, null, 3000);
            });
    }

    login(authData: AuthData) {
        this.uiService.loadingStateChange.next(true);
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then((result) => {
                this.uiService.loadingStateChange.next(false);
                console.log(result);
            })
            .catch((error) => {
                this.uiService.loadingStateChange.next(false);
                this.uiService.showMessage(error.message, null, 3000);
            });
    }

    logout() {
        this.afAuth.auth.signOut();

    }

    isAuth() {
        return this.isAuthenticated;
    }
}
