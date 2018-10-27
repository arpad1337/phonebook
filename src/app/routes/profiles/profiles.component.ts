import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/profile';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  profiles: Profile[] = [];

  constructor(private profileService: ProfileService, private router: Router) {

  }

  ngOnInit() {
    this.profileService.getProfiles().subscribe((profiles: Profile[]) => {
      this.profiles = profiles.sort((a: Profile, b: Profile) => a.firstName.localeCompare(b.firstName));
    });
  }

  createProfile() {
    this.router.navigate(['create-profile']);
  }

  goToProfile(id: number) {
    this.router.navigate(['profiles', id]);
  }

}
