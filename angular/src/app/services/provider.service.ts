import { Injectable } from '@angular/core';
import { Provider } from 'src/interfaces/provider';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Complex } from 'src/interfaces/complex';
import { Address } from 'src/interfaces/address';
import { environment } from 'src/environments/environment';
import { Notify } from 'src/interfaces/notification';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})

export class ProviderService {

  apiUrl: string;

  httpOptions: any;

  constructor(
    private httpBus: HttpClient,
    msalService: MsalService
  ) {
    this.apiUrl = environment.endpoints.providerXYZ;
    this.httpOptions = {
      headers: new HttpHeaders({
          'Authorization': msalService.getUser().userIdentifier
      })
    }
  }

  getProviders(): Observable<any> {
    const providerUrl = this.apiUrl + 'Provider';
    return this.httpBus.get<Provider[]>(providerUrl, this.httpOptions);
  }

  getProviderById(providerId: number): Observable<any> {
    const providerUrl = this.apiUrl + 'Provider/' + providerId;
    return this.httpBus.get<Provider>(providerUrl, this.httpOptions);
  }

  getComplexesByProvider(providerId: number): Observable<any> {
    const url = this.apiUrl + 'Complex/provider/' + providerId;
    return this.httpBus.get<Complex[]>(url, this.httpOptions);
  }

  postComplex(complex: Complex, providerId: number): Observable<HttpEvent<Complex>> {
    const postComplexUrl = this.apiUrl + 'Complex/provider/' + providerId;
    return this.httpBus.post<Complex>(postComplexUrl, JSON.parse(JSON.stringify(complex)), this.httpOptions);
  }

  getAddressesByProvider(providerId: number): Observable<any> {
    const addressUrl = this.apiUrl + 'Address/provider/' + providerId;
    return this.httpBus.get<Address[]>(addressUrl, this.httpOptions);
  }

  postRequestByProvider(req: Notify) {
    return this.httpBus.post(this.apiUrl + `Notification`, req);
  }
}
