import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TicketsComponent } from './tickets/tickets.component';
import { EditTicketComponent } from './tickets/edit-ticket/edit-ticket.component';
import { ReportComponent } from './tickets/report/report.component';
import { AdminAuthGuard } from 'src/app/guards/admin-auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminAuthGuard],
    component: TicketsComponent
  },
  {
    path: 'admin/tickets/:id',
    canActivate: [AdminAuthGuard],
    component: EditTicketComponent
  },
  {
    path: 'admin/ticket-report',
    canActivate: [AdminAuthGuard],
    component: ReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
