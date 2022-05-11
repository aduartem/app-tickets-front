import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private url: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.url = environment.basePathBff;
  }

  createTicket(data: any) {
    return this.http.post(`${this.url}/tickets`, data);
  }

  getAssignedTickets() {
    const userData = this.authService.getUserData();
    return this.http.get(`${this.url}/user/${userData['username']}/tickets`);
  }

  resolveTicket(ticketId: number, data: { status_id: number }) {
    return this.http.put(`${this.url}/tickets/${ticketId}/resolve`, data);
  }

  getAllTickets() {
    return this.http.get(`${this.url}/tickets`);
  }

  getTicketById(ticketId: string) {
    return this.http.get(`${this.url}/tickets/${ticketId}`);
  }

  updateTicket(ticketId: string, data: { subject: string, description: string, assigned_user: string }) {
    return this.http.put(`${this.url}/tickets/${ticketId}`, data);
  }

  deleteTicket(ticketId: string) {
    return this.http.delete(`${this.url}/tickets/${ticketId}`);
  }

  getReport() {
    return this.http.get(`${this.url}/report/tickets`);
  }
}
