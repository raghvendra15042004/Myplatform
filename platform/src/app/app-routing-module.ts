import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/auth/auth-guard';
import { roleGuard } from './core/auth/role-guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth-module').then(m => m.AuthModule),
  },
  {
    path: 'feature/:appId',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/inbox/inbox-module').then(m => m.InboxModule),
  },
  {
    path: 'record/:appId',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/record/record-module').then(m => m.RecordModule),
  },
  {
    path: 'designer',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'designer'] },
    loadChildren: () =>
      import('./features/designer/designer-module').then(m => m.DesignerModule),
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}