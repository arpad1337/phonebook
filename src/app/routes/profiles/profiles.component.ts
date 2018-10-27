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
  filteredProfiles: Profile[] = [];
  private _searchTerm = "";

  constructor(private profileService: ProfileService, private router: Router) {

  }

  ngOnInit() {
    this.profileService.getProfiles().subscribe((profiles: Profile[]) => {
      this.profiles = profiles.sort((a: Profile, b: Profile) => a.firstName.localeCompare(b.firstName));
      this.filteredProfiles = this.profiles;
    });
  }

  get searchTerm() {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    value = value.trim();
    this._searchTerm = value;
    this.filteredProfiles = this.profiles.filter((profile: Profile) => {
      return (
        profile.firstName.toLowerCase().indexOf(value.toLowerCase()) > -1 || 
        profile.lastName.toLowerCase().indexOf(value.toLowerCase()) > -1 || 
        (profile.firstName + " " + profile.lastName).toLowerCase().indexOf(value.toLowerCase()) > -1
      ); 
    })
  }

  createProfile() {
    this.router.navigate(['create-profile']);
  }

  goToProfile(id: number) {
    this.router.navigate(['profiles', id]);
  }

}
