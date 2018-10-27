import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';
import { ProfileUtils } from '../../utils/profile.utils';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  public model: Profile = {
    phoneNumber: '',
    lastName: '',
    firstName: '',
    profileColor: '',
    notes: ''
  };

  public error: string;

  constructor(private router: Router, private profileService: ProfileService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.profileService.getProfileById(+params['id']).subscribe((profile: Profile) => {
        this.model = profile;
      });
    })
  }

  get phoneNumber(): string {
    return this.model.phoneNumber;
  }

  set phoneNumber(value: string) {
    if(!value) {
      return;
    }
    value = value.replace(/([^0-9])+/i, '');
    if(value.charAt(0) != '+') {
      this.model.phoneNumber = '+' + value;
      return;
    }
    this.model.phoneNumber = value;
  }

  validateModel() {
    if (!ProfileUtils.validate(this.model)) {
      this.error = "First name, last name and phone number are mandatory";
      return false;
    } else {
      this.error = undefined;
      return true;
    }
  }

  commit() {
    if (!this.validateModel()) {
      return;
    }

    this.profileService.updateProfile(this.model).subscribe(() => {
      this.router.navigate(['profiles']);
    })
  }

  cancel() {
    this.router.navigate(['profiles']);
  }

}
