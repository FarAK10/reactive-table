import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, share, Subject, switchMap } from 'rxjs';
import { TableMetaData } from '../../types/interfaces/table-meta-data.interface';
import { TableServiceService } from '../../services/table-service.service';
import { MockApiClientService } from '../../services/mock-api-client.service';
import { cols } from './data/table-columns';
import { IStudentDTO } from '../../types/interfaces/mock-response.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss'],
})
export class TableWrapperComponent implements OnInit {
  cols = cols;
  metaData$ = new BehaviorSubject<TableMetaData>(
    this.tableService.getDefaultTableMeta(false)
  );
  res$ = this.metaData$.pipe(
    switchMap((metaData) => this.mockApiClinet.getAll(metaData)),
    share()
  );

  items$ = this.res$.pipe(map((res) => res.items));

  totalItems$ = this.res$.pipe(map((res) => res.total));
  constructor(
    private tableService: TableServiceService,
    private mockApiClinet: MockApiClientService
  ) {}

  ngOnInit() {}

  onMetaDataChange(metaData: TableMetaData) {
    alert(`metaData changed ${JSON.stringify(metaData)}`);
    this.metaData$.next(metaData);
  }

  deleteItem(item: IStudentDTO) {
    alert(`delete ${item.firstName} ${item.lastName}?`);
  }

  editItem(item: IStudentDTO) {
    alert(`edit  ${item.firstName} ${item.lastName}?`);
  }
}
