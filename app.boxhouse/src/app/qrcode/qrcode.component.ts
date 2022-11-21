import { Component, OnInit } from '@angular/core'
import QRCode from 'easyqrcodejs'

@Component({
  selector: 'app-qrcode',
  templateUrl: './template.html',
  styleUrls: ['./template.css']
})
export class QRcodeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  async generateQRcode(link){
    document.getElementById("qrcode").innerHTML = ''

    let qrcode = new QRCode(document.getElementById("qrcode"), {
        text: "https://cssscript.com",
        logo: "../../assets/shared/img/img-box.png",
        logoWidth: undefined,
        logoHeight: undefined,
        logoBackgroundColor: '#ffffff',
        logoBackgroundTransparent: false
    });
  }

}
