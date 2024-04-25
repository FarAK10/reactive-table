import { Injectable } from '@angular/core';
import { ITableColWithFilterControl } from '../types/interfaces/table-filterts.interfaces';
import { ISelectItem } from '../types/interfaces/select-item.interface';
import { SpServiceService } from './SpService.service';
import { TableMetaData } from '../types/interfaces/table-meta-data.interface';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class TableServiceService {
  constructor(
    private spService: SpServiceService,
    private datePipe: DatePipe
  ) {}

  convertDynamicTableFilters(filters: any): any {
    const convertValue = (value: any): string => {
      if (value instanceof Date) {
        const transformedValue = this.datePipe.transform(value, 'yyyy-MM-dd');
        return transformedValue !== null ? transformedValue : '';
      } else if (typeof value == 'number') {
        return value.toString();
      } else {
        return value;
      }
    };

    const filteredData = Object.fromEntries(
      Object.entries(filters).map(([key, value]: [string, any]) => [
        key,
        { value: convertValue(value.value) },
      ])
    );

    return filteredData;
  }
  getNestedProp(obj: any, path: string): any {
    const value = path.split('.').reduce((o, p) => (o ? o[p] : undefined), obj);

    return value;
  }

  applyEventFilters(event, table: TableMetaData): TableMetaData {
    if (event) {
      table = Object.assign(table, event);
      table.filters = JSON.stringify(event.filters);
    }
    return table;
  }

  applyFilters(filters: any, tableMeta: TableMetaData): TableMetaData {
    const filtersCopy = this.deleteNullableFilters(filters);
    tableMeta.filters = this.convertDynamicTableFilters(filtersCopy);

    return tableMeta;
  }

  deleteMetaFilter(
    fieldName: string,
    tableMetaData: TableMetaData
  ): TableMetaData {
    delete tableMetaData.filters[fieldName];
    return tableMetaData;
  }
  stringifyTableMetaFilters(tableMetaData: TableMetaData): TableMetaData {
    if (typeof tableMetaData.filters != 'string') {
      tableMetaData.filters = JSON.stringify(tableMetaData.filters);
    }
    return tableMetaData;
  }

  getStringifiedTableWithFilters(
    filters: any,
    tableMetaData: TableMetaData
  ): TableMetaData {
    const tableMeta = this.applyFilters(filters, tableMetaData);
    return this.stringifyTableMetaFilters(tableMeta);
  }

  getDefaultTableMeta(isAllRecords = false): TableMetaData {
    const maxValue = 2147483647;
    return {
      filters: {},
      globalFilter: null,
      rows: isAllRecords ? maxValue : 10,
    } as unknown as TableMetaData;
  }

  deleteNullableFilters(filters: any): any {
    const filtersCopy = { ...filters };
    Object.entries(filtersCopy).forEach(([key, value]) => {
      if (!value || value === '0') {
        delete filtersCopy[key];
      } else {
        filtersCopy[key] = { value };
      }
    });
    return filtersCopy;
  }
  setOptionsToCols<T extends ITableColWithFilterControl>(cols: T[]): T[] {
    return cols.map((col: T) => {
      if (col.options && col.spName) {
        // Add a check for col.spName
        const selectItems: ISelectItem[] = this.spService.getSpSelectItems(
          col.spName
        );
        col.options = selectItems;
      }
      return col;
    });
  }
}
