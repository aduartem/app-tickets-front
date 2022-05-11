import { Component, OnInit } from '@angular/core';

import { TicketsService } from 'src/app/services/tickets/tickets.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  report: any = [];

  constructor(
    private ticketsService: TicketsService,
  ) { }

  ngOnInit(): void {
    this.ticketsService.getReport()
      .subscribe((response: any) => {
        this.report = response.data;
      });
  }

}
