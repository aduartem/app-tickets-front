import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TicketsService } from 'src/app/services/tickets/tickets.service';
import { UnresolvedStatusInterface } from 'src/app/interfaces/unresolved-status.interface';
import { AssignedTicketInterface } from 'src/app/interfaces/assigned-ticket.interface';
import { AssignedTicket } from 'src/app/models/assigned-ticket';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  tickets = new Array<AssignedTicketInterface>();
  unresolvedStatuses: UnresolvedStatusInterface[] = [
    { id: 2, name: 'Resuelto' },
    { id: 3, name: 'Rechazado' },
    { id: 4, name: 'Anulado' },
  ];
  status: any;

  constructor(
    private ticketsService: TicketsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.ticketsService.getAssignedTickets()
      .subscribe((response: any) => {
        this.tickets = response.tickets.map((ticket: any) => {
          return new AssignedTicket(
            ticket.id,
            ticket.subject,
            ticket.description,
            ticket.creator_user,
            ticket.assigned_user,
            ticket.status_id,
            ticket.Status.name,
            ticket.assignment_date,
            ticket.resolution_date,
            ticket.createdAt,
          )
        });
      });
  }

  changeStatus(e: any, ticketId: number) {
    const data = {
      status_id: e.target.value,
    };
    this.ticketsService.resolveTicket(ticketId, data)
      .subscribe(
        (response: any) => {
          this.ngOnInit();
        },
        (error: any) => {
          alert(error.error.message);
        }
      );
  }

}
