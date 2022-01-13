import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { IonicSelectableComponent } from 'ionic-selectable';
import { forkJoin } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { CreateTicketService } from 'src/app/services/create-ticket.service';
import { StorageService } from 'src/app/services/storage.service';
import * as helperFunc from '../../helper';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketPage implements OnInit {
  filterTerm: string;
  service = null;
  location: any;
  locationId: [];
  ticketDetails: any = null;
  damageType = 'reportDamage';
  floorNo = null;
  seatNo = null;
  date = helperFunc.formatDateMMDDYYY() + ' ' + helperFunc.formatedTimeHHMM();
  loggedInUser = this.storage.getLocalStorage("user");;
  invalidForm: Boolean = false;
  locations = [];
  services = [];
  comments = null;
  problemTypes: any[] = [];
  uploadedImage:any;
  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(route: ActivatedRoute, 
    private camera: Camera,
    private appService: AppService,
    private storage: StorageService, 
    private createTicketService: CreateTicketService) {
    route.params.subscribe(() => {
      this.ticketDetails = history.state.data && history.state.data.ticketDetails ? history.state.data.ticketDetails : null;
      if (this.ticketDetails) {
        this.damageType = this.ticketDetails.problemType ? this.ticketDetails.problemType : null;
        this.floorNo = this.ticketDetails.floorNo ? this.ticketDetails.floorNo : null;
        this.seatNo = this.ticketDetails.seatNo ? this.ticketDetails.seatNo : null;
        let findLocation = this.locations.filter(location => location.name == this.ticketDetails.location);
        this.location = this.ticketDetails.location && findLocation.length ? findLocation[0] : null;
        this.comments = this.ticketDetails.comments ? this.ticketDetails.comments : null
      } else {
        this.resetAllDetails()
      }
    });
  }

  async ngOnInit() {
    forkJoin([
      await this.appService.fetchAllProblemTypes(),
      await this.createTicketService.fetchAllServices(),
      await this.createTicketService.fetchAllLocations()
    ]).subscribe(resp => {
      this.problemTypes = resp[0];
      this.services = resp[1];
      this.locations = resp[2];
    });
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }

  resetAllDetails() {
    this.ticketDetails = null;
    this.damageType = null;
    this.floorNo = null;
    this.seatNo = null;
    this.location = null;
    this.comments = null;
  }

  createTicket() {
    if (this.damageType && 
      this.location &&
      ((this.damageType == 'Request Seat Change' && this.floorNo && this.seatNo) || 
      (this.damageType == 'Report Issue' && this.service))
     ) {
      this.invalidForm = false;
      let reqObj = {
        "ticketId": this.ticketDetails && this.ticketDetails.ticketId ? this.ticketDetails.ticketId : null,
        "problemCode": this.damageType,
        "problemDescription": this.comments,
        "statusCode": this.ticketDetails && this.ticketDetails.statusCode ? this.ticketDetails.statusCode : null,
        "trxLocationFloorCode": this.floorNo,
        "serviceCode": this.service,
        "attatchment": this.uploadedImage ? this.uploadedImage : null,
        "priority": this.ticketDetails && this.ticketDetails.priority ? this.ticketDetails.priority : null,
        "estimatedTime": this.ticketDetails && this.ticketDetails.estimatedTime ? this.ticketDetails.estimatedTime : null,
        "assignedTo": this.ticketDetails && this.ticketDetails.assignedTo ? this.ticketDetails.assignedTo : null,
        "createdDate": this.ticketDetails && this.ticketDetails.assignedTo ? this.ticketDetails.assignedTo : new Date(),
        "createdBy": this.loggedInUser && this.loggedInUser.id ? this.loggedInUser.id : null,
        "modifiedDate": new Date(),
        "modifiedBy": this.loggedInUser && this.loggedInUser.id ? this.loggedInUser.id : null
      }
    } else {
      this.invalidForm = true;
    }
  }
  openCamera() {
    console.log("clicked")
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.uploadedImage = base64Image;
    }, (err) => {
      // Handle error
    });
  }

  redirectToTabs(screen) {
    this.appService.redirectToTabs(screen, null)
  }
}
