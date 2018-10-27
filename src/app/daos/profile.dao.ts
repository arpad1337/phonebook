import { Injectable, Inject } from '@angular/core';
import { Profile } from '../models/profile';
import { Observable, of, Observer } from 'rxjs';
import { LOCAL_STORAGE } from '../utils/local-storage.injection-token';

export interface ProfileIndex {
    SEQUENCE: number;
    ENTRIES: number[];
}

@Injectable()
export class ProfileDao {

    private static readonly NAMESPACE = "PROFILES";
    private INDEX: ProfileIndex = {
        ENTRIES: [],
        SEQUENCE: 1
    };

    constructor(@Inject(LOCAL_STORAGE) private localStorage: Storage) {
        const index = this.getItem<ProfileIndex>('index');
        if (index) {
            this.INDEX = index;
        }
    }

    hasIndex(): boolean {
        return !!this.getItem('index');
    }

    create(profile: Profile): Observable<Profile> {
        return Observable.create((observer: Observer<Profile>) => {
            const clone = {
                ...profile,
                id: this.INDEX.SEQUENCE++
            };
            this.INDEX.ENTRIES.push(clone.id);
            this.setItem(String(clone.id), clone);
            this.setItem('index',this.INDEX);
            observer.next(this.getItem<Profile>(String(clone.id)));
            observer.complete();
        });
       
    }

    findById(id: number): Observable<Profile> {
        return Observable.create((observer: Observer<Profile>) => {
            const entry = this.getItem<Profile>(String(id));
            observer.next(entry);
            observer.complete();
        });
    }

    findAll(): Observable<Profile[]> {
        return Observable.create((observer: Observer<Profile[]>) => {
            const collection = [];
            this.INDEX.ENTRIES.forEach((key: number) => {
                collection.push(this.getItem<Profile>(String(key)));
            });
            observer.next(collection);
            observer.complete();
        });
    }

    update(profile: Profile): Observable<Profile> {
        return Observable.create((observer: Observer<Profile>) => {
            this.setItem(String(profile.id), profile);
            observer.next(this.getItem<Profile>(String(profile.id)));
            observer.complete();
        });
    }

    delete(id: number): Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            const position = this.INDEX.ENTRIES.indexOf(id);
            this.INDEX.ENTRIES.splice(position, 1);
            this.removeItem(String(id));
            this.setItem('index', this.INDEX);
            observer.next(true);
            observer.complete();
        });
    }

    clear(): Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            this.INDEX.ENTRIES.forEach((entry: number) => {
                this.removeItem(String(entry));
            });
            this.INDEX.SEQUENCE = 1;
            this.INDEX.ENTRIES = [];
            this.removeItem('index');
            observer.next(true);
            observer.complete();
        });
    }

    private setItem(key: string, data: any): void {
        const insertableKey = `${ProfileDao.NAMESPACE}_${key}`;
        this.localStorage.setItem(insertableKey, JSON.stringify(data));
    }

    private getItem<T>(key: string): T {
        const insertableKey = `${ProfileDao.NAMESPACE}_${key}`;
        return JSON.parse(this.localStorage.getItem(insertableKey)) as T;
    }

    private removeItem(key: string): void {
        const insertableKey = `${ProfileDao.NAMESPACE}_${key}`;
        this.localStorage.removeItem(insertableKey);
    }
    

}