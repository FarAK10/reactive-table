import { NgModule } from '@angular/core';
import { ResetButtonComponent } from './reset-button.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ResetButtonComponent],
  exports: [ResetButtonComponent],
  imports: [CommonModule],
})
export class ResetButtonModule {}
