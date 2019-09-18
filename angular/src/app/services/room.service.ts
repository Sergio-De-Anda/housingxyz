import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../../interfaces/room';
import { Amenity } from '../../interfaces/amenity';
import { Observable, of } from 'rxjs';
import { Address } from 'src/interfaces/address';
import { TestServiceData } from './static-test-data';
import { environment } from 'src/environments/environment';
import { RoomType } from 'src/interfaces/room-type';
import { Gender } from 'src/interfaces/gender';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    roomUrl = environment.endpoints.providerXYZ + 'api/';

    constructor(private httpBus: HttpClient) { }

    getRoomById(id: number): Observable<Room> {
        return of(TestServiceData.room);
    }

    postRoom(room: Room, providerId: number): Observable<Room> {
        const postRoomUrl = this.roomUrl + 'Room/' + providerId;
        return this.httpBus.post<Room>(postRoomUrl, JSON.parse(JSON.stringify(room)));
    }

    getRoomsByProvider(providerId: number): Observable<Room[]> {
        const providerRoomsUrl = `${this.roomUrl}Room/provider/${providerId}`;
        return this.httpBus.get<Room[]>(providerRoomsUrl);
    }
    getRoomTypes(): Observable<RoomType[]> {
        const url = this.roomUrl + 'Room/type';
        return this.httpBus.get<RoomType[]>(url);
    }
    getGenders(): Observable<Gender[]> {
        const url = this.roomUrl + 'Gender';
        return this.httpBus.get<Gender[]>(url);
    }

    getAmenities(): Observable<Amenity[]> {
        const amenitiesUrl = this.roomUrl + 'Room/amenity';
        console.log('Get amenities called');
        return this.httpBus.get<Amenity[]>(amenitiesUrl);
    }
}
