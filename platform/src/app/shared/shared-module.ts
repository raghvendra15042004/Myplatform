import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KpiCard } from './components/kpi-card/kpi-card';
import { ConfirmDialog } from './components/confirm-dialog/confirm-dialog';

@NgModule({
  declarations: [KpiCard, ConfirmDialog],
  imports: [CommonModule, RouterModule],
  exports: [
    CommonModule,
    RouterModule,
    KpiCard,
    ConfirmDialog,
  ],
})
export class SharedModule {}