import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
})
export class TicketDetailComponent {
  ticketDetails: any = null;
  status:string;
  comments:any = '';
  constructor(private modalCtrl: ModalController,
    public navParams: NavParams,) { }
  dismissModal() {
    this.modalCtrl.dismiss();
  }
  ngOnInit() {
    console.log(this.navParams.get("ticketId"));
    // TODO: Get API call for fetching ticket Details
    this.ticketDetails = {
      eMail: 'test2@lumen.com',
      statusCode: 'Resolved',
      assignedTo: 'Facility memeber 2',
      problemType: "Seat Change",
      problemDescription: "4th floor, Seat no 24, Touch stone, Bangalore",
      assignedDate: "11-12-2021",
      employeeID: "9264646",
      employeeName: 'John Pearson',
      ticketId: "LT_76475",
      createdDate: "10-12-2021",
      priority: "Medium",
      reportsTo: "James Smith"
    }
  }

  submitTicketComments() {
    console.log("Helloooo ticket updatedd!!")
  }

}
