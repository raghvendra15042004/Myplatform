import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Record } from './record/record';

const routes: Routes = [
  { path: 'new', component: Record },
  { path: ':recordId', component: Record },
  { path: '', redirectTo: 'new', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordRoutingModule {}