import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilesComponent } from './routes/profiles/profiles.component';
import { SettingsComponent } from './routes/settings/settings.component';
import { AboutComponent } from './routes/about/about.component';
import { CreateProfileComponent } from './routes/create-profile/create-profile.component';

const routes: Routes = [
  {
    path: 'profiles',
    pathMatch: 'full',
    component: ProfilesComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'create-profile',
    component: CreateProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
