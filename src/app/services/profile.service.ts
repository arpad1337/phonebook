import { Injectable } from '@angular/core';
import { ProfileDao } from '../daos/profile.dao';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable()
export class ProfileService {

    constructor(
        private profileDao: ProfileDao, 
        private httpClient: HttpClient) {

    }

    isMigrated(): boolean {
        return this.profileDao.hasIndex();
    }

    sync(): Observable<Profile[]> {
        return this.profileDao.clear().pipe(
            mergeMap(_ => {
                return this.httpClient.get<Profile[]>('/assets/profiles.json');
            }),
            mergeMap((profiles: Profile[]) => {
                return forkJoin(profiles.map((profile: Profile) => this.profileDao.create(profile)));
            })
        );
    }

    getProfiles(): Observable<Profile[]> {
        return this.profileDao.findAll();
    }

    getProfileById(id: number): Observable<Profile> {
        return this.profileDao.findById(id);
    }

    updateProfile(profile: Profile): Observable<Profile> {
        return this.profileDao.update(profile);
    }

    createProfile(profile: Profile): Observable<Profile> {
        return this.profileDao.create(profile);
    }

    deleteProfile(id: number): Observable<boolean> {
        return this.profileDao.delete(id);
    }

}