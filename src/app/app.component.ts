import { Component, OnInit } from '@angular/core';
import { ProfileService } from './services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public loading = true;

  constructor(
    private profileService: ProfileService, 
    private router: Router
  ) {
    
  }

  ngOnInit() {
    if (!this.profileService.isMigrated()) {
      this.profileService.sync().subscribe(_ => {
        this.loading = false;
        this.router.navigate(['profiles']);
      });
      return;
    }
    this.loading = false;
    this.router.navigate(['profiles']);
  }

}
