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
