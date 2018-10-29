import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { LOCAL_STORAGE } from '../utils/local-storage.injection-token';
import { ProfileDao } from '../daos/profile.dao';
import { HttpClientModule, HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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

const TEST_DATA = [
  {
      "firstName": "John",
      "lastName": "Doe",
      "phoneNumber": "+12345678902",
      "notes": "Hello",
      "profileColor": "#aac4ef"
  },
  {
      "firstName": "Jane",
      "lastName": "Doe",
      "phoneNumber": "+13456789022",
      "notes": "Hello",
      "profileColor": "#d2aaef"
  }
];

class MockHttpClient {
  get() {
      return of(TEST_DATA);
  }
}

describe('ProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ],
    providers: [
      ProfileService,
      ProfileDao,
      {
        provide: HttpClient,
        useValue: new MockHttpClient()
      },
      {
        provide: LOCAL_STORAGE,
        useValue: new MockLocalStorage()
      }
    ]
  }));

  it('should be created', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service).toBeTruthy();
  });

  it('should call dao for index check', () => {
    const dao: ProfileDao = TestBed.get(ProfileDao);
    const hasIndexSpy = spyOn(dao, 'hasIndex').and.returnValue(true);
    const service: ProfileService = TestBed.get(ProfileService);
    service.isMigrated();
    expect(hasIndexSpy).toHaveBeenCalled();
    expect(hasIndexSpy).toHaveBeenCalledTimes(1);
  });

  it('should sync from backend', () => {
    const dao: ProfileDao = TestBed.get(ProfileDao);
    const clearSpy = spyOn(dao, 'clear').and.returnValue(of(true));
    const httpClient = TestBed.get(HttpClient);
    const backendCallSpy = spyOn(httpClient,'get');
    const createSpy = spyOn(dao, 'create');
    const service: ProfileService = TestBed.get(ProfileService);
    service.sync();
    expect(clearSpy).toHaveBeenCalled();
    expect(backendCallSpy).toHaveBeenCalled();
    expect(createSpy).toHaveBeenCalled();
    expect(createSpy).toHaveBeenCalledTimes(2);
  });

  it('should call dao for profiles', () => {
    const dao: ProfileDao = TestBed.get(ProfileDao);
    const daoCallSpy = spyOn(dao, 'findAll').and.returnValue(TEST_DATA);
    const service: ProfileService = TestBed.get(ProfileService);
    service.getProfiles();
    expect(daoCallSpy).toHaveBeenCalled();
    expect(daoCallSpy).toHaveBeenCalledTimes(1);
  });

  it('should call dao for profile by id', () => {
    const dao: ProfileDao = TestBed.get(ProfileDao);
    const daoCallSpy = spyOn(dao, 'findById').and.returnValue(TEST_DATA[0]);
    const service: ProfileService = TestBed.get(ProfileService);
    service.getProfileById(1);
    expect(daoCallSpy).toHaveBeenCalled();
    expect(daoCallSpy).toHaveBeenCalledTimes(1);
  });

  it('should call dao update', () => {
    const dao: ProfileDao = TestBed.get(ProfileDao);
    const daoCallSpy = spyOn(dao, 'update');
    const service: ProfileService = TestBed.get(ProfileService);
    service.updateProfile(TEST_DATA[0]);
    expect(daoCallSpy).toHaveBeenCalled();
    expect(daoCallSpy).toHaveBeenCalledTimes(1);
  });

  it('should call dao for create', () => {
    const dao: ProfileDao = TestBed.get(ProfileDao);
    const daoCallSpy = spyOn(dao, 'create');
    const service: ProfileService = TestBed.get(ProfileService);
    service.createProfile(TEST_DATA[0]);
    expect(daoCallSpy).toHaveBeenCalled();
    expect(daoCallSpy).toHaveBeenCalledTimes(1);
  });

  it('should call dao for deletion', () => {
    const dao: ProfileDao = TestBed.get(ProfileDao);
    const daoCallSpy = spyOn(dao, 'delete').and.returnValue(true);
    const service: ProfileService = TestBed.get(ProfileService);
    service.deleteProfile(1);
    expect(daoCallSpy).toHaveBeenCalled();
    expect(daoCallSpy).toHaveBeenCalledTimes(1);
  });
});
