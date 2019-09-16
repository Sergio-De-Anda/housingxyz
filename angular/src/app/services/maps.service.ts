import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from '../../interfaces/address';
import { Maps } from '../../interfaces/maps/maps';
import { Observable, of, from } from 'rxjs';
import { TestServiceData } from './static-test-data';
import { promise } from 'protractor';
import { MapsGeoLocation } from '../../interfaces/maps/maps-geo-location';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  private geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  private distUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=';
  private key = '&key=AIzaSyCxYMcmEjlHQ2r2CywMgyK7YEplxurqW2A';

  constructor(private httpClient: HttpClient) { }

  async verifyAddress(address: Address): Promise<boolean> {
    const query = this.geocodeUrl + address.streetAddress + address.zipCode + this.key;
    return await this.httpClient.get<Maps>(query).toPromise()
      .then((mapsResult) => {
        console.log(mapsResult);
        return mapsResult.status === 'OK';
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  async getCoordinates(address: Address): Promise<MapsGeoLocation> {
    console.log(address.streetAddress);
    const query = this.geocodeUrl + address.streetAddress + '+' +
      address.city + '+' +
      address.state + '+' +
      address.zipCode + this.key;
    return await this.httpClient.get<Maps>(query).toPromise()
      .then((mapsResult) => {
        console.log('lat:' + mapsResult.results[0].geometry.location.lat);
        console.log('lng:' + mapsResult.results[0].geometry.location.lng);
        return mapsResult.results[0].geometry.location;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  async checkDistance(address1: Address, address2: Address): Promise<number> {
    const origin = await this.getCoordinates(address1);
    console.log(origin);
    const destination = await this.getCoordinates(address2);
    console.log(destination);
    const R = 3958.8;
    const dLat = Math.PI / 180 * (destination.lat - origin.lat);
    const dLon = Math.PI / 180 * (destination.lng - origin.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(Math.PI / 180 * (origin.lat)) * Math.cos(Math.PI / 180 * (destination.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    console.log('distance: ' + d + ' miles');
    return d;
  }
}
