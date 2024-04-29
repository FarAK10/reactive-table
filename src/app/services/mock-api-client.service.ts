import { Injectable } from '@angular/core';
import { mockResponse } from '../mock-data/mock-response';
import { delay, Observable, of } from 'rxjs';
import { IResponse } from '../types/interfaces/mock-response.interface';
import { TableMetaData } from '../types/interfaces/table-meta-data.interface';

@Injectable({
  providedIn: 'root',
})
export class MockApiClientService {
  mockResponse: IResponse = mockResponse;

  constructor() {}

  getAll(tableMeta: TableMetaData): Observable<IResponse> {
    return of(this.mockResponse).pipe(delay(300));
  }
}
