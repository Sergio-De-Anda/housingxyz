import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tenant } from 'src/interfaces/tenant';
import { HttpClientModule, HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Batch } from 'src/interfaces/batch';
import { Car } from 'src/interfaces/car';

@Injectable({
  providedIn: 'root'
})

// Service for AJAX Calls to various Rest APIs needed by Coordinators
export class CoordinatorService {

  apiUrl: string = `${environment.endpoints.coordinator}` + 'api/';

  httpOptions: any;

  constructor (
    private httpBus: HttpClient
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({

      })
    };
  }

  GetTenantById(tenantId: string): Observable<any> {
    const tenantUrl = `${this.apiUrl}` + 'Tenant/' + `${tenantId}`;
    return this.httpBus.get<Tenant>(tenantUrl, this.httpOptions);
  }

  GetBatchByTrainingCenterId(trainingCenterId: string): Observable<any> {
    const batchUrl = `${this.apiUrl}` + 'Tenant/Batch?trainingCenterString=' + `${trainingCenterId}`;
    return this.httpBus.get<Batch[]>(batchUrl, this.httpOptions);
    // return this.httpBus.get<Batch[]>(batchUrl);
  }

  PostTenant(tenant: Tenant): Observable<HttpEvent<Tenant>> {
    const postTenantUrl = `${this.apiUrl}` + 'Tenant/RegisterTenant';
    return this.httpBus.post<Tenant>(postTenantUrl, JSON.parse(JSON.stringify(tenant)), this.httpOptions);
  }

  //needs work
  PutTenant(tenantId: string) {
    const putTenantUrl = `${this.apiUrl}` + 'UpdateTenant/' + `${tenantId}`;
    return this.httpBus.put<Tenant>(putTenantUrl, this.httpOptions);
  }
}
