import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class UIService {
    loadingStateChange = new Subject<boolean>();

    constructor(private snackBar: MatSnackBar) { }

    showMessage(message, action, duration) {
        this.snackBar.open(message, action, {
            duration
        })
    }
}
