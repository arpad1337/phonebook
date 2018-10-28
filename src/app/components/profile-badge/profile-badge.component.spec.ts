import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBadgeComponent } from './profile-badge.component';
import { ShortNamePipe } from '../../pipes/short-name.pipe';

describe('ProfileBadgeComponent', () => {
  let component: ProfileBadgeComponent;
  let fixture: ComponentFixture<ProfileBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBadgeComponent, ShortNamePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
