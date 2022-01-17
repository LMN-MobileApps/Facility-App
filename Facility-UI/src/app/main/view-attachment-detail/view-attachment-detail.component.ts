import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './view-attachment-detail.component.html',
  styleUrls: ['./view-attachment-detail.component.scss'],
})
export class ViewAttachmentDetailComponent {

  constructor(
    private modalCtrl: ModalController,
    public navParams: NavParams
  ) { }

  ngOnInit() { 
    console.log(this.navParams.get("imgSrc"))
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
