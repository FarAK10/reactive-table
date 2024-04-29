import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableWrapperComponent } from './table-wrapper.component';
import { TableModule } from '../table/table.module';

@NgModule({
  imports: [CommonModule, TableModule],
  declarations: [TableWrapperComponent],
  exports: [TableWrapperComponent],
})
export class TableWrapperModule {}
