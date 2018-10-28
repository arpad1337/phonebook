import { Component, Inject } from '@angular/core';
import { Profile } from '../../models/profile';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
    selector: 'delete-profile-dialog',
    templateUrl: 'delete-profile.dialog.html',
  })
  export class DeleteProfileDialog {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteProfileDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Profile
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }