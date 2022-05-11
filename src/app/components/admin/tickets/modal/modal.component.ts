import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { TicketsService } from 'src/app/services/tickets/tickets.service';
import { UsersService } from 'src/app/services/users/users.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  ticket: any;
  users: any;
  form: FormGroup = new FormGroup({
    subject: new FormControl(''),
    description: new FormControl(''),
    assigned_user: new FormControl(''),
  });
  loading = false;
  submitted: boolean = false;
  reset: boolean = false;
  error: any;
  errorValidation: boolean = false;

  @Output() messageEvent = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private ticketsService: TicketsService,
    private usersService: UsersService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      subject: ['', Validators.required],
      description: ['', Validators.required],
      assigned_user: ['', Validators.required],
    });

    this.usersService.getDevs()
      .subscribe((response: any) => {
        this.users = response.users;
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(data: any): void {
    this.submitted = true;
    this.errorValidation = false;
    this.reset = false;
    Object.keys(this.form.controls).forEach(key => {
      if (this.form.get(key)?.errors) {
        this.errorValidation = true;
      }
    });

    if (this.errorValidation) {
      return;
    }

    this.loading = true;

    const userData = this.authService.getUserData();
    data.creator_user = userData.username;

    this.ticketsService.createTicket(data)
      .subscribe(
        (response: any) => {
          this.loading = false;
          this.error = null;
          this.form.reset();
          this.reset = true;
          this.messageEvent.emit('ok');
        },
        (error: any) => {
          this.error = error;
          console.log(this.error);
          this.loading = false;
        });
  }
}
