import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Table } from 'primeng/table';
import { TableServiceService } from '../../services/table-service.service';
import {
  ITableColumn,
  ITableColWithFilterControl,
} from '../../types/interfaces/table-filterts.interfaces';
import { TableControlNames } from '../../types/enums/table-control-names';
import { TableMetaData } from '../../types/interfaces/table-meta-data.interface';
import { FormBuilder } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  pipe,
  startWith,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  @ViewChild('dt') table!: Table;

  @Input() set tableCols(cols: ITableColWithFilterControl[]) {
    this.addFilterControls(cols);
    this.cols = this.tableService.setOptionsToCols(cols);
  }
  @Input() set reloadTable(value: boolean) {
    this.reloadTableAction$.next(value);
  }

  @Input() items: any;

  @Input() totalItemsLabel: string = 'total_items_label';

  @Input() totalItems: number = 0;

  @Input() set enableEdit(value: boolean) {
    this.updateColumns('edit', '', value);
  }
  @Input() set enableDelete(value: boolean) {
    this.updateColumns('delete', '', value);
  }
  @Input() set showIndex(value: boolean) {
    this.updateColumns('id', '№', value);
  }

  @Input() set showResetFilters(value: boolean) {
    this.updateColumns('reset', '', value, TableControlNames.reset);
    console.log(this.cols);
  }

  @Output()
  onMetaDataChange = new EventEmitter<TableMetaData>();

  @Output() onEditItem = new EventEmitter<any>();

  @Output()
  onDeleteItem = new EventEmitter<any>();

  destroy$ = new Subject();
  cols: ITableColWithFilterControl[] = [];

  filtersForm = this.fb.group({});

  tableMeta$ = new BehaviorSubject<TableMetaData>(
    this.tableService.getDefaultTableMeta(false)
  );
  reloadTableAction$ = new BehaviorSubject(false);

  tableFiters$ = this.filtersForm.valueChanges.pipe(startWith({}));

  isFilterEmpty$ = this.tableFiters$.pipe(
    map((filters) => Object.values(filters).every((value) => !value))
  );

  tableMetaWithFilters = combineLatest([
    this.tableMeta$,
    this.tableFiters$.pipe(debounceTime(400)),
    this.reloadTableAction$,
  ]).pipe(
    map(([meta, filters]) => {
      const tableMeta = this.tableService.applyFilters(filters, meta);
      const stringifiedMetaData: TableMetaData =
        this.tableService.stringifyTableMetaFilters(tableMeta);
      return stringifiedMetaData;
    })
  );
  constructor(
    private tableService: TableServiceService,
    private fb: FormBuilder
  ) {}

  controlNames = TableControlNames;

  ngOnInit() {
    this.tableMetaWithFilters
      .pipe(takeUntil(this.destroy$))
      .subscribe((tableMeta) => {
        this.onMetaDataChange.emit(tableMeta);
      });
  }

  addFilterControls(cols: ITableColWithFilterControl[]) {
    cols.forEach((col) => {
      this.filtersForm.addControl(col.formControlName, this.fb.control(''));
    });
  }

  trackByFieldName(index: number, item: ITableColumn): string {
    return item.field;
  }

  editItem(item: any) {
    this.onEditItem.emit(item);
  }

  deleteItem(item: any) {
    this.onDeleteItem.emit(item);
  }

  onLoadLazy(tableMeta: TableMetaData) {
    this.tableMeta$.next(tableMeta);
  }

  resetFilters() {
    this.filtersForm.reset();
    console.log(this.filtersForm.value);
  }

  private updateColumns(
    field: string,
    header: string,
    add: boolean,
    controlName: TableControlNames = null
  ): void {
    this.cols = this.tableService.updateColumns(
      this.cols,
      field,
      header,
      add,
      controlName
    );
  }
}
