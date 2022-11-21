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
    this.load()
  }

  async bindEvents(){
    let self = this

    let generateQRcode = document.getElementById('generateQRcode')

    generateQRcode.addEventListener('click', function(e){
        self.generateQRcode('https://google.com')
    })
  }

  async load(){

    this.bindEvents()
  }

  async generateQRcode(link){
    document.getElementById("qrcode").innerHTML = ''

    let qrcode = new QRCode(document.getElementById("qrcode"), {
        width: 200,
        height: 200,
        text: link,
        logo: "../../assets/shared/img/img-box.png",
        logoWidth: 50,
        logoHeight: 50,
        logoBackgroundColor: '#ffffff',
        logoBackgroundTransparent: false
    });
    console.log(qrcode)
  }

}
