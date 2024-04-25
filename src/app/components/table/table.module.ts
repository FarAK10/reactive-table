import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableModule as PrimeNgTableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DeleteButtonModule } from '../delete-button/delete-button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  imports: [
    CommonModule,
    PrimeNgTableModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    DeleteButtonModule,
    ReactiveFormsModule,
    TranslocoModule,
  ],
  declarations: [TableComponent],
  exports: [TableComponent],
})
export class TableModule {}
