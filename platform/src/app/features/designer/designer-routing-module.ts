import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilder } from './form-builder/form-builder';
import { AppSettings } from './app-settings/app-settings';

const routes: Routes = [
  { path: '', component: FormBuilder },
  { path: 'settings', component: AppSettings },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesignerRoutingModule {}