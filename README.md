# Reactive Forms with Filter - Angular Table Wrapper Component

## Overview

This Angular component serves as a wrapper for a shared table component, facilitating the development of reactive forms with filtering capabilities. It leverages RxJS observables and Angular services to manage table data and interactions.

## Components and Services

- **TableWrapperComponent**:

  - Acts as a container for the shared table component.
  - Manages table metadata and data retrieval.
  - Handles CRUD operations on table items.

- **Shared Table Component**:

  - Displays tabular data with support for pagination, sorting, and filtering.
  - Provides options for deleting and editing table items.

- **TableServiceService**:

  - Provides methods for managing table metadata and interacting with the table data source.

- **MockApiClientService**:
  - Mock service used for fetching mock data.

## Features

- Dynamically load and display tabular data.
- Allow users to edit and delete table items.
- Update table metadata based on user interactions.

## Usage

1. Import the `TableWrapperComponent` into your Angular application.
2. Configure the component with appropriate inputs and outputs.
3. Implement custom logic for handling table metadata changes, item deletion, and item editing.
4. Integrate the component into your application templates.

## Example

```typescript
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, map, share, Subject, switchMap } from "rxjs";
import { TableMetaData } from "../../types/interfaces/table-meta-data.interface";
import { TableServiceService } from "../../services/table-service.service";
import { MockApiClientService } from "../../services/mock-api-client.service";
import { cols } from "./data/table-columns";
import { IStudentDTO } from "../../types/interfaces/mock-response.interface";

@Component({
  selector: "app-table-wrapper",
  templateUrl: "./table-wrapper.component.html",
  styleUrls: ["./table-wrapper.component.scss"],
})
export class TableWrapperComponent implements OnInit {
  cols = cols;
  metaData$ = new BehaviorSubject<TableMetaData>(this.tableService.getDefaultTableMeta(false));
  res$ = this.metaData$.pipe(
    switchMap((metaData) => this.mockApiClient.getAll(metaData)),
    share()
  );

  items$ = this.res$.pipe(map((res) => res.items));

  totalItems$ = this.res$.pipe(map((res) => res.total));
  constructor(private tableService: TableServiceService, private mockApiClient: MockApiClientService) {}

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
```

```HTML
<app-table
  [items]="items$ | async"
  [totalItems]="totalItems$ | async"
  [tableCols]="cols"
  [enableDelete]="true"
  [enableEdit]="true"
  [showResetFilters]="true"
  (onMetaDataChange)="onMetaDataChange($event)"
  (onDeleteItem)="deleteItem($event)"
  (onEditItem)="editItem($event)"
></app-table>
```

```Cols example
import { SpSelectItems } from '../../../types/enums/sp-select-items';
import { TableControlNames } from '../../../types/enums/table-control-names';
import { ITableColWithFilterControl } from '../../../types/interfaces/table-filterts.interfaces';
export const cols: ITableColWithFilterControl[] = [
  {
    field: 'firstName',
    header: 'firnst_name',
    formControlName: 'firstName',
    controlType: TableControlNames.input,
  },
  {
    field: 'lastName',
    header: 'last_name',
    formControlName: 'lastName',
    controlType: TableControlNames.input,
  },
  {
    field: 'age',
    header: 'age',
    formControlName: null,
    controlType: null,
  },
  {
    field: 'email',
    header: 'email',
    formControlName: 'email',
    controlType: TableControlNames.input,
  },
  {
    field: 'birthDate',
    header: 'birthDate',
    formControlName: 'birthDate',
    controlType: TableControlNames.datepicker,
    dateFormat: 'dd.mm.yyyy',
  },
  {
    field: 'subjectId',
    header: 'subject',
    formControlName: 'subjectId',
    controlType: TableControlNames.select,
    options: [],
    spName: SpSelectItems.subjects,
  },
];

```
