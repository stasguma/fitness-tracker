import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthModule } from './auth/auth.module';
import { UIService } from './shared/ui.service';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';


@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        HeaderComponent,
        SidenavListComponent,
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        FlexLayoutModule,
        AuthModule,
    ],
    providers: [AuthService, TrainingService, UIService],
    bootstrap: [AppComponent]
})
export class AppModule { }
