import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../../models/profile';

@Component({
  selector: 'app-profile-badge',
  templateUrl: './profile-badge.component.html',
  styleUrls: ['./profile-badge.component.scss']
})
export class ProfileBadgeComponent implements OnInit {

  @Input() profile: Profile;

  constructor() { }

  ngOnInit() {
  }

}
