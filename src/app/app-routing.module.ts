import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'dev/tickets',
    canActivate: [AuthGuard],
    loadChildren: () =>  import('./components/dev/dev.module').then(m => m.DevModule),
  },
  {
    path: 'admin/tickets',
    canActivate: [AuthGuard],
    loadChildren: () =>  import('./components/admin/admin.module').then(c => c.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
