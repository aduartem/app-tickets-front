import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { TicketsService } from 'src/app/services/tickets/tickets.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  tickets: any = [];
  status: any;
  ticket: any;
  loading = false;
  error: any;

  constructor(
    private ticketsService: TicketsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.ticketsService.getAllTickets()
      .subscribe((response: any) => {
        this.tickets = response.tickets;
      });
  }

  deleteTicket(ticketId: any) {
    this.loading = true;
    this.ticketsService.deleteTicket(ticketId)
    .subscribe(
      (response: any) => {
        this.loading = false;
        this.error = null;
        this.ngOnInit();
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
        this.loading = false;
      }
    );
  }

  receiveMessage($event: any) {
    console.log($event);
    this.ngOnInit();
  }
}
