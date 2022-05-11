import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TicketsComponent } from './tickets/tickets.component';
import { DevAuthGuard } from 'src/app/guards/dev-auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [DevAuthGuard],
    component: TicketsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevRoutingModule { }
