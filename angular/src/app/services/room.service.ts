import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../../models/room';
import { Amenity } from '../../models/amenity';
import { Observable, of } from 'rxjs';
import { Address } from 'src/models/address';
import { TestServiceData } from './static-test-data';

@Injectable({
    providedIn: 'root'
})
export class RoomService {

    constructor(private http: HttpClient) { }

    getRoomById(id: number): Observable<Room> {
        return of(TestServiceData.room);
    }
    postRoom(r: Room): Observable<Room> {
        return of(r);
    }
    getRoomsByProvider(providerId: number): Observable<Room[]> {
        return of([TestServiceData.room, TestServiceData.room2]);
    }
    getRoomTypes(): Observable<string[]> {
        return of(['Apartment', 'Dorm']);
    }
    getGenders(): Observable<string[]> {
        const simpleObservable = new Observable<string[]>((sub) => {
            const GenderList: string[] = TestServiceData.dummyGender;
            sub.next(GenderList);
            sub.complete();
        });
        return simpleObservable;
    }
    getAmenities(): Observable<Amenity[]> {
        const simpleObservable = new Observable<Amenity[]>((sub) => {
            const AList: Amenity[] = TestServiceData.dummmyList;
            sub.next(AList);
            sub.complete();
        });
        return simpleObservable;
    }
}
