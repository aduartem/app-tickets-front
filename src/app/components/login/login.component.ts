import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  loading = false;
  submitted: boolean = false;
  error: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(data: any) {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    this.authService.login(data)
      .subscribe(
        (res: any) => {
          if (res) {
            this.loading = false;
            this.error = null;
            const userData = this.authService.getUserData();
            if (userData['roleId'] === 1) {
              this.router.navigate(['admin/tickets']);
            } else {
              this.router.navigate(['dev/tickets']);
            }
          }
        },
        (error: any) => {
          this.error = error;
          console.log(this.error);
          this.loading = false;
        });
  }
}
