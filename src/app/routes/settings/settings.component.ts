import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
  }

  syncDatabase() {
    this.profileService.sync().subscribe();
  }

}
