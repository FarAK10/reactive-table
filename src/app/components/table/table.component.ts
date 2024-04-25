import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { TableServiceService } from '../../services/table-service.service';
import {
  ITableColumn,
  ITableColWithFilterControl,
} from '../../types/interfaces/table-filterts.interfaces';
import { TableControlNames } from '../../types/enums/table-control-names';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @ViewChild('dt') table!: Table;
  @Input() set tableCols(cols: ITableColWithFilterControl[]) {
    this.cols = this.tableService.setOptionsToCols(cols);
  }
  cols: ITableColWithFilterControl[] = [];
  constructor(private tableService: TableServiceService) {}

  controlNames = TableControlNames;

  ngOnInit() {}

  trackByFieldName(index: number, item: ITableColumn): string {
    return item.field;
  }
}
