import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-profile-by-id',
  templateUrl: './profile-by-id.component.html',
  styleUrls: ['./profile-by-id.component.scss']
})
export class ProfileByIdComponent implements OnInit {

  public profile: Profile = {
    phoneNumber: '',
    lastName: '',
    firstName: '',
    profileColor: '',
    notes: ''
  };

  private profileId: number;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private dialog: MatDialog 
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.profileId = +params['id'];
      this.profileService.getProfileById(this.profileId).subscribe((profile: Profile) => {
        this.profile = profile;
      });
    })
  }

  edit() {
    this.router.navigate(['update-profile', this.profileId]);
  }

  back() {
    this.router.navigate(['profiles']);
  }

  delete() {
    let dialogRef = this.dialog.open(DeleteDialog, {
      data: this.profile
    });
    dialogRef.afterClosed().subscribe((id) => {
      if (id) {
        this.profileService.deleteProfile(id).subscribe(() => {
          this.router.navigate(['profiles']);
        });
      }
    });
  }
  
}

@Component({
  selector: 'delete-profile-dialog',
  templateUrl: 'delete-profile.dialog.html',
})
export class DeleteDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Profile
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
