import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  MatButtonToggleModule,
  MatButtonModule, 
  MatCheckboxModule, 
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { LOCAL_STORAGE } from './utils/local-storage.injection-token';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';

import { ProfileDao } from './daos/profile.dao';
import { ProfileService } from './services/profile.service';
import { CommonModule } from '@angular/common';
import { ProfilesComponent } from './routes/profiles/profiles.component';
import { ShortNamePipe } from './pipes/short-name.pipe';
import { SettingsComponent } from './routes/settings/settings.component';
import { AboutComponent } from './routes/about/about.component';
import { ProfileBadgeComponent } from './components/profile-badge/profile-badge.component';
import { ProfileByIdComponent } from './routes/profile-by-id/profile-by-id.component';
import { CreateProfileComponent } from './routes/create-profile/create-profile.component';
import { UpdateProfileComponent } from './routes/update-profile/update-profile.component';
import { DeleteProfileDialog } from './routes/profile-by-id/delete-profile.dialog';

@NgModule({
  declarations: [
    AppComponent,
    PhoneNumberPipe,
    ShortNamePipe,
    ProfilesComponent,
    SettingsComponent,
    AboutComponent,
    ProfileBadgeComponent,
    ProfileByIdComponent,
    CreateProfileComponent,
    UpdateProfileComponent,
    DeleteProfileDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: LOCAL_STORAGE,
      useValue: window.localStorage
    },
    ProfileDao,
    ProfileService
  ],
  entryComponents: [
    DeleteProfileDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
