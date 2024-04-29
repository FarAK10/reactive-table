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
import { EditButtonModule } from '../edit-button/edit-button.module';
import { SpModule } from '../../pipes/sp.module';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ResetButtonModule } from '../reset-button/reset-button.module';

@NgModule({
  imports: [
    CommonModule,
    PrimeNgTableModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    DeleteButtonModule,
    ReactiveFormsModule,
    EditButtonModule,
    DialogModule,
    SpModule,
    OverlayPanelModule,
    CalendarModule,
    ResetButtonModule,
  ],
  declarations: [TableComponent],
  exports: [TableComponent],
})
export class TableModule {}
