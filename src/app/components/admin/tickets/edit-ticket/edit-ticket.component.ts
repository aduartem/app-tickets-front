import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { TicketsService } from 'src/app/services/tickets/tickets.service';
import { UsersService } from 'src/app/services/users/users.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {

  ticketId: string;
  ticket: any;
  users: any;
  form: FormGroup = new FormGroup({
    subject: new FormControl(''),
    description: new FormControl(''),
    assigned_user: new FormControl(''),
  });
  loading = false;
  submitted: boolean = false;
  error: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private ticketsService: TicketsService,
    private usersService: UsersService,
    private authService: AuthService,
  ) {
    this.ticketId = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.ticketsService.getTicketById(this.ticketId)
      .subscribe((response: any) => {
        this.ticket = response.ticket;

        this.form = this.formBuilder.group({
          subject: [this.ticket.subject, Validators.required],
          description: [this.ticket.description, Validators.required],
          assigned_user: [this.ticket.assigned_user, Validators.required],
        });
      });

    this.usersService.getDevs()
      .subscribe((response: any) => {
        this.users = response.users;
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  goBack() {
    this.router.navigate(['admin/tickets']);
  }

  onSubmit(data: any): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    const userData = this.authService.getUserData();
    data.creator_user = userData.username;

    this.ticketsService.updateTicket(this.ticketId, data)
      .subscribe(
        (response: any) => {
          this.loading = false;
          this.error = null;
        },
        (error: any) => {
          this.error = error;
          console.log(this.error);
          this.loading = false;
        });
  }
}
