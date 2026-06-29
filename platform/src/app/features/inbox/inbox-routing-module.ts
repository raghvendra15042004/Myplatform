import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Inbox } from './inbox/inbox';

const routes: Routes = [
  { path: 'inbox', component: Inbox },
  { path: '', redirectTo: 'inbox', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}