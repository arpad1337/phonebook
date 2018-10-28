import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { ProfileService } from '../../services/profile.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  MatButtonToggleModule,
  MatButtonModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule
} from '@angular/material';
import { ProfileDao } from '../../daos/profile.dao';
import { LOCAL_STORAGE } from '../../utils/local-storage.injection-token';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

class MockLocalStorage implements Storage {
  values = new Map<string, string>();

  setItem(k, v) {
    this.values.set(k, v);
    return this.values.get(k);
  }

  getItem(k) {
    return this.values.get(k) || null;
  }

  removeItem(k) {
    this.values.delete(k);
  }

  get length(): number {
    return this.values.size;
  }

  clear() {
    this.values = new Map<string, string>();
  }

  key(index: number): string {
    return Array.from(this.values.keys())[index] as string;
  }

}

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        HttpClientModule
      ],
      declarations: [ SettingsComponent ],
      providers: [
        ProfileService,
        ProfileDao,
        {
          provide: LOCAL_STORAGE,
          useValue: new MockLocalStorage()
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sync db', () => {
    const profileService = TestBed.get(ProfileService);
    const syncSpy = spyOn(profileService,'sync').and.returnValue(of([]));
    const app = fixture.debugElement.componentInstance as SettingsComponent;
    app.syncDatabase();
    expect(syncSpy).toHaveBeenCalled();
    expect(syncSpy).toHaveBeenCalledTimes(1);
  })
});
