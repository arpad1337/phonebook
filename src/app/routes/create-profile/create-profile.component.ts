import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/profile';
import { Router } from '@angular/router';
import { ProfileUtils } from '../../utils/profile.utils';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  public model: Profile = {
    phoneNumber: '',
    lastName: '',
    firstName: '',
    profileColor: '',
    notes: ''
  };

  public error: string;;

  constructor(private router: Router, private profileService: ProfileService) { }

  ngOnInit() {
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
    this.model.profileColor = ProfileUtils.generateRandomColor();

    if (!this.validateModel()) {
      return;
    }

    this.profileService.createProfile(this.model).subscribe(() => {
      this.router.navigate(['profiles']);
    })
  }

  cancel() {
    this.router.navigate(['profiles']);
  }

}
