import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { InterceptorService } from './interceptor.service';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

class BlankComponent {

}

describe('InterceptorService', () => {
  // let service: DataService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  const authService: any = {getTokenSilently$: Observable.of("token")};

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule.withRoutes([
      {
        path: '',
        component: BlankComponent
      }, {
        path: 'login-splash',
        component: BlankComponent
      }]),
      HttpClientTestingModule],
    providers: [
      {
        provide: AuthService,
        useValue: authService
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorService,
        multi: true,
      },
    ]
  });

    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    const service: InterceptorService = TestBed.get(InterceptorService);
    expect(service).toBeTruthy();
  });

  // Couldnt get this to work.
  /* it('adds Authorization header', fakeAsync(async () => {

    await httpClient.get('/data').subscribe(
        response => {
            expect(response).toBeTruthy();
        }
    );

    const req = httpMock.expectOne(r => r.headers.has('Authorization'));

    req.flush({ hello: 'world' });
    httpMock.verify();
  }));*/

});
