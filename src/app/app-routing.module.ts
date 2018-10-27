import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilesComponent } from './routes/profiles/profiles.component';
import { SettingsComponent } from './routes/settings/settings.component';
import { AboutComponent } from './routes/about/about.component';
import { CreateProfileComponent } from './routes/create-profile/create-profile.component';
import { ProfileByIdComponent } from './routes/profile-by-id/profile-by-id.component';
import { UpdateProfileComponent } from './routes/update-profile/update-profile.component';

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
  },
  {
    path: 'profiles/:id',
    component: ProfileByIdComponent
  },
  {
    path: 'update-profile/:id',
    component: UpdateProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
