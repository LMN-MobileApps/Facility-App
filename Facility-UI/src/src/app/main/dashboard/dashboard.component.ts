import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { AppService } from 'src/app/services/app.service';
import { StorageService } from 'src/app/services/storage.service';
import { TicketService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  doughnutChart: any;
  @ViewChild('barChart') barChart;

  view = [400, 300];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };
  ticketsChartData = [];
  bars: any;
  colorArray: any = [];
  ticketsInfo: any = null;
  loggedInUser = this.storage.getLocalStorage("user");
  problemTypes: any[] = [];
  showLoader: Boolean = false;
  slideOptsAwards = {
    loop: false,
    slidesPerView: 1.3,
    speed: 500,
    effect: 'slide',
    pager: false,
    zoom: false,
    spaceBetween: 10,
  };
  slideOptstoprated = {
    loop: false,
    slidesPerView: 1.3,
    speed: 500,
    effect: 'slide',
    pager: false,
    zoom: false,
    spaceBetween: 10,
  }

  constructor(
    private storage: StorageService,
    private appService: AppService,
    private ticketService: TicketService
  ) { }

  ngOnInit() {
    this.showLoader = true;
    this.appService.getUpdatedProblemType().subscribe(async (categoryType) => {
      if (categoryType == "All Categories" || !categoryType) {
        let reqObj = {
          "id": this.loggedInUser && this.loggedInUser.id ? this.loggedInUser.id : ''
        }
        await this.ticketService.fetchDashboardData(reqObj).subscribe(resp => {
          this.showLoader = false;
          if (resp && resp.length) {
            this.ticketsInfo = resp[0];
            this.doughnutChartMethod();
          }
        }, err => {
          this.showLoader = false;
        })
      } else {
        let filterByCategoryReqObj = {
          "userId": this.loggedInUser && this.loggedInUser.id ? this.loggedInUser.id : '',
          "category": categoryType
        }
        await this.ticketService.filterDashboardDataByCategory(filterByCategoryReqObj)
          .subscribe(resp => {
            this.showLoader = false;
            if (resp) {
              this.ticketsInfo = resp;
              this.doughnutChartMethod();
            }
          }, err => {
            this.showLoader = false;
          })
      }
    })
  }

  redirectToStatusScreen(ticketType = 'All') {
    this.appService.redirectToTabs('status', { state: { data: { ticketType: ticketType } } })
  }
  doughnutChartMethod() {
    if (this.ticketsInfo) {
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [{
            label: '',
            borderWidth: 0,
            data: [
              this.ticketsInfo?.ResolvedTickets,
              this.ticketsInfo?.PendingTickets,
              this.ticketsInfo?.RejectedTickets
            ],
            backgroundColor: [
              'rgba(0, 126, 68, 1)',
              'rgba(255, 158, 24, 1)',
              'rgba(214, 32, 21, 1)',],
          }]
        }
      });
    }
  }
}
