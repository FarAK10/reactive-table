import { Injectable } from '@angular/core';
import { mockResponse } from '../mock-data/mock-response';
import { delay, Observable, of } from 'rxjs';
import { IResponse } from '../types/interfaces/mock-response.interface';

@Injectable({
  providedIn: 'root',
})
export class MockApiClientService {
  mockResponse: IResponse = mockResponse;

  constructor() {}

  getAll(): Observable<IResponse> {
    return of(this.mockResponse).pipe(delay(300));
  }
}
