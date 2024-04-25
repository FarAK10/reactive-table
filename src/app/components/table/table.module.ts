import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableModule as PrimeNgTableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule,
    PrimeNgTableModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
  ],
  declarations: [TableComponent],
  exports: [TableComponent],
})
export class TableModule {}
