import { Injectable } from '@angular/core';
import { Provider } from 'src/interfaces/provider';
import { HttpClient } from '@angular/common/http';
import { TrainingCenter } from 'src/interfaces/trainingcenter';
import { Observable } from 'rxjs';
import { Complex } from 'src/interfaces/complex';
import { Address } from 'src/interfaces/address';
import { TestServiceData } from './static-test-data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProviderService {

  apiUrl: string = environment.endpoints.providerXYZ;

  constructor(private httpBus: HttpClient) { }

  getProviders(): Observable<Provider[]> {
    const providerUrl = this.apiUrl + 'Provider';

    return this.httpBus.get<Provider[]>(providerUrl);
  }

  getProviderById(providerId: number): Observable<Provider> {
    const providerUrl = this.apiUrl + 'Provider/' + providerId;

    return this.httpBus.get<Provider>(providerUrl);
  }

  getComplexesByProvider(providerId: number): Observable<Complex[]> {
    return this.httpBus.get<Complex[]>(this.apiUrl + 'Complex/provider/' + providerId);
  }

  postComplex(complex: Complex, providerId: number): Observable<Complex> {
    const postComplexUrl = this.apiUrl + 'Complex/provider/' + providerId;

    return this.httpBus.post<Complex>(postComplexUrl, JSON.parse(JSON.stringify(complex)));
  }

  getAddressesByProvider(provider: number): Observable<Address[]> {
    const simpleObservable = new Observable<Address[]>((sub) => {
      // observable execution
      const addrList: Address[] = [];
      addrList.push(TestServiceData.dummyAddress);
      addrList.push(TestServiceData.livPlusAddress);
      sub.next(addrList);
      sub.complete();
    });
    return simpleObservable;
  }
}
