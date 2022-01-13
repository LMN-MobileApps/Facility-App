import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTicketPage } from './create-ticket.component';
import { IonicSelectableModule } from 'ionic-selectable';

const routes: Routes = [
  {
    path: '',
    component: CreateTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), IonicSelectableModule],
  exports: [RouterModule],
})
export class CreateTicketPageRoutingModule {}
