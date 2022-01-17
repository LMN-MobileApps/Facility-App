import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  dateTime;
  currentpage;
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  problemTypes: any[] = []
  
  constructor(
    private appService: AppService,
  ) { }

  async ngOnInit() {
    this.formatedDateTime();

    this.appService.getCurrentPage().subscribe(resp => {
      this.currentpage = resp;
    })

    await this.appService.fetchAllProblemTypes().subscribe(resp => {
      if(resp) {
        this.problemTypes = resp;
      }
    }, err => {
      this.problemTypes = []
    });
  }
  setCurrentTab() {
    this.appService.setCurrentPage(this.tabs.getSelected())
  }

  formatedDateTime() {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let date = new Date();
    var hours = date.getHours();
    var dateNum = date.getDate();
    var minutes: any = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes;
    this.dateTime = weekday[date.getDay()] + ", " + dateNum + (dateNum == 1 ? "st " : dateNum == 2 ? 'nd ' : dateNum == 3 ? 'rd ' : 'th ') + date.getFullYear() + "," + strTime
  }

  filterByProblemType(event) {
    this.appService.updateProblemTypeFilter(event.target.value);
  }
}

