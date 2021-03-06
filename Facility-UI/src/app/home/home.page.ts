import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  constructor(private router: Router,
    private appService: AppService
  ) {}

  redirectToTabs(screen,ticketType=null) {
    this.appService.redirectToTabs(screen, { state: { data: { ticketType: ticketType } } });
  } 
}
