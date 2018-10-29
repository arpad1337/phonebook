import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileService } from './services/profile.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { By } from "@angular/platform-browser";
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
import { ProfileDao } from './daos/profile.dao';
import { LOCAL_STORAGE } from './utils/local-storage.injection-token';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { of } from 'rxjs'

class LocalStorageStub implements Storage {
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

@Component({ selector: 'test', template: '' })
class DummyComponent { }

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([{ path: 'profiles', component: DummyComponent }]),
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
      declarations: [
        AppComponent,
        DummyComponent
      ],
      providers: [
        ProfileService,
        ProfileDao,
        {
          provide: LOCAL_STORAGE,
          useValue: new LocalStorageStub()
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should sync if not migrated', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance as AppComponent;
    const profileService = TestBed.get(ProfileService);
    const router = TestBed.get(Router);
    const navigateSpy = spyOn(router, 'navigate');
    const hasMigratedSpy = spyOn(profileService, 'isMigrated').and.returnValue(false);
    const syncSpy = spyOn(profileService, 'sync').and.returnValue(of([]));
    expect(app.loading).toBe(true);
    fixture.detectChanges();
    expect(hasMigratedSpy).toHaveBeenCalled();
    expect(hasMigratedSpy).toHaveBeenCalledTimes(1);
    expect(syncSpy).toHaveBeenCalled();
    expect(syncSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['profiles']);
    expect(app.loading).toBe(false);
  });

  it('should render title in a span tag in toolbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-toolbar span:first-child').textContent).toContain('PhoneBook');
  });

  it('should show a spinner when loading', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance as AppComponent;
    app.ngOnInit = () => { };
    expect(app.loading).toBe(true);
    fixture.detectChanges();
    const element = fixture.debugElement;
    expect(element.query(By.css('.loader'))).toBeTruthy();
    app.loading = false;
    fixture.detectChanges();
    expect(element.query(By.css('.loader'))).toBeFalsy();
  });

});
