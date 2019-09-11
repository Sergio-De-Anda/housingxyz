import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Address } from '../../interfaces/address';
import { Maps } from '../../interfaces/maps/maps';
import { Observable, of, from } from 'rxjs';
import { TestServiceData } from './static-test-data';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  private geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  private distUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=';
  private key = '&key=AIzaSyCxYMcmEjlHQ2r2CywMgyK7YEplxurqW2A';

  constructor(private httpClient: HttpClient) { }

  verifyAddress() {
    const query = this.geocodeUrl + TestServiceData.dummyAddress.streetAddress + this.key;
    this.httpClient.get<Maps>(query).toPromise().then(x => {
      console.log(x);
      if (x.status === 'OK' ) {
        console.log(x.status);
        return true;
      }
      return false;
    });
  }

  checkDistance() {
    let lat1;
    let lat2;
    let lon1;
    let lon2;
    const adr1 = this.geocodeUrl + TestServiceData.UTA.streetAddress + this.key;
    const adr2 = this.geocodeUrl + TestServiceData.livPlusAddress.streetAddress + this.key;

    console.log(adr1);
    this.httpClient.get<Maps>(adr1).toPromise().then(x => {
      console.log('adr1 lat: ' + x.results[0].geometry.location.lat);
      console.log('adr1 lng: ' + x.results[0].geometry.location.lng);
      lat1 = x.results[0].geometry.location.lat;
      lon1 = x.results[0].geometry.location.lng;
      console.log(x.results[0].formatted_address);
      console.log(lat1 + ' ' + lon1);

      console.log(adr2);
      this.httpClient.get<Maps>(adr2).toPromise().then(y => {
        console.log('adr2 lat: ' + y.results[0].geometry.location.lat);
        console.log('adr2 lng: ' + y.results[0].geometry.location.lng);
        lat2 = y.results[0].geometry.location.lat;
        lon2 = y.results[0].geometry.location.lng;
        console.log(y.results[0].formatted_address);
        console.log(lat2 + ' ' + lon2);

        const R = 3958.8;
        const dLat = Math.PI / 180 * (lat2 - lat1);
        const dLon = Math.PI / 180 * (lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(Math.PI / 180 * (lat1)) * Math.cos(Math.PI / 180 * (lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        console.log('distance: ' + d + ' miles');
      });
    });
  }
}
