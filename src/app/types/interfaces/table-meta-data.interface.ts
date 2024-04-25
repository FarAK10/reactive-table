export class TableMetaData {
  filters?: string | undefined;
  first!: number;
  rows!: number;
  sortField?: string | undefined;
  sortOrder!: number;
  filterHandle?: string | undefined;
  tagHandle?: string | undefined;
  globalFilter?: string | undefined;
}
