import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { ModalComponent } from './tickets/modal/modal.component';
import { EditTicketComponent } from './tickets/edit-ticket/edit-ticket.component';
import { ReportComponent } from './tickets/report/report.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    TicketsComponent,
    ModalComponent,
    EditTicketComponent,
    ReportComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
