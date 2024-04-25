import { TableControlNames } from "../enums/table-control-names";
import { ISelectItems } from "./select-item.interface";

export interface IFilterableNavItem {
  key?: number[];
  attributes?: string[];
}

export interface ITableColumn extends IFilterableNavItem {
  field: string;
  header: string;
}
export interface ITableColWithFilterControl extends ITableColumn {
  formControlName: string;
  controlType: TableControlNames;
  filterMatchMode?: 'equals' | 'contains';
  spName?: SpSelectItems;
  options?: ISelectItems[];
  optionFilter?: string;
}

export interface IDynamicTableColumn extends ITableColWithFilterControl {
  isActive: boolean;
  roleAttribute: string;
  selectAttribute?: string;
}
