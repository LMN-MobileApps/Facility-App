import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';
import { DomSanitizer } from '@angular/platform-browser';
import { AppService } from 'src/app/services/app.service';
import { ViewAttachmentDetailComponent } from '../view-attachment-detail/view-attachment-detail.component';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage {
  filterByTicketType = 'All';
  ticketStatusData = [];
  loggedInUser = 'Facility memeber 1';
  thumbnail: any;
  data = [
    {
      tName: 'AC33711',
      eMail: 'test1@lumen.com',
      statusCode: 'Pending',
      assignedTo: 'Facility memeber 1',
      problemDescription: "Seat Change",
      problemType: "reportDamage",
      employeeID: "9264646",
      ticketId: "LT_76472",
      createdDate: "10-12-2021",
      priority: "Medium",
      floorNo: "5th Floor",
      seatNo: "Seat No: 20",
      reportsTo: "James Smith",
      location: "Finland",
      comments: "Table not clean"
    },
    {
      tName: 'AC33712',
      eMail: 'test2@lumen.com',
      statusCode: 'Resolved',
      assignedTo: 'Facility memeber 2',
      problemDescription: "Clean tables needed",
      problemType: "reportIssue",
      employeeID: "9264646",
      ticketId: "LT_76475",
      createdDate: "10-12-2021",
      priority: "Low",
      floorNo: "4th Floor",
      seatNo: "Seat No: 10",
      reportsTo: "James Smith",
      location: "Finland",
      comments: "Table not clean"
    }
  ];
  constructor(public modalCtrl: ModalController,
    private router: Router,
    private http: HttpClient,
    route: ActivatedRoute,
    private appService: AppService,
    private sanitizer: DomSanitizer) {
    route.params.subscribe(() => {
      console.log("hai")
      this.filterByTicketType = history.state.data && history.state.data.ticketType ? history.state.data.ticketType : 'All';
      this.filterTickets();
    });
  }

  async openModal(ticketId) {
    const modal = await this.modalCtrl.create({
      component: TicketDetailComponent,
      backdropDismiss: false,
      componentProps: {
        ticketId: ticketId
      }
    });
    return await modal.present();
  }

  async openViewModal() {
    const modal = await this.modalCtrl.create({
      component: ViewAttachmentDetailComponent,
      componentProps: {
        imgSrc: await this.loadImg()
      },
      backdropDismiss: false,
    });
    return await modal.present();
  }
  filterTickets() {
    if (this.data && this.data.length) {
      if (this.filterByTicketType == 'myTickets') {
        this.ticketStatusData = this.data.filter(ticket => ticket.assignedTo == this.loggedInUser)
      } else if (this.filterByTicketType !== 'All') {
        this.ticketStatusData = this.data.filter(ticket => ticket.statusCode == this.filterByTicketType)
      } else {
        this.ticketStatusData = this.data;
      }
    }
  }
  onChange(type) {
    this.filterByTicketType = type ? type : 'All';
    this.filterTickets();
  }
  redirectTo(screen, ticketDetails = null) {
    this.appService.redirectToTabs(screen, { state: { data: { ticketDetails: ticketDetails } } });
  }
  getData() {
    return this.http.get('/assets/config.json');
  }

  loadImg() {
    // TODO: Pass the image path from backend
    this.getData()
      .subscribe((baseImage: any) => {
        //alert(JSON.stringify(data.image));
        let objectURL = 'data:image/jpeg;base64,' + baseImage.image;

        this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        // this.downloadImage()
        console.log(this.thumbnail)
        return this.thumbnail
      });
  }

  async downloadImage() {

    // retrieve the image
    // retrieve the image
    const response = await fetch("../../../assets/shapes.svg");
    // convert to a Blob
    // convert to a Blob
    const blob = await response.blob();
    // convert to base64 data, which the Filesystem plugin requires
    const base64Data = await this.convertBlobToBase64(blob) as string;

    // const savedFile = await Filesystem.writeFile({
    //   path: fileName,
    //   data: base64Data,
    //   directory: FilesystemDirectory.Data
    // });

    // helper function

  }
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
