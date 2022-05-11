import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DevRoutingModule } from './dev-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    TicketsComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DevRoutingModule
  ]
})
export class DevModule { }
