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

  async bindEvents(){
    let self = this

    let generateQRcode = document.getElementById('generateQRcode')

    generateQRcode.addEventListener('click', function(e){
        console.log('coucou')
        self.generateQRcode('https://google.com')
    })
  }

  async load(){

    this.bindEvents()
  }

  async generateQRcode(link){
    document.getElementById("qrcode").innerHTML = ''

    let qrcode = new QRCode(document.getElementById("qrcode"), {
        text: link,
        logo: "../../assets/shared/img/img-box.png",
        logoWidth: undefined,
        logoHeight: undefined,
        logoBackgroundColor: '#ffffff',
        logoBackgroundTransparent: false
    });
    console.log(qrcode)
  }

}
