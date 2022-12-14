import { Component, OnInit } from '@angular/core';
import Toolbox               from '../../assets/shared/js/Toolbox.js'
import { Html5QrcodeScanner }from "html5-qrcode"
const settings  = require('../../settings.js') // ALWAYS IMPORT

@Component({
  selector: 'app-scan',
  templateUrl:'./template.html',
  styleUrls: ['./template.css']
})
export class ScanComponent implements OnInit {
  private toolbox            = new Toolbox()

  constructor() {
    this.toolbox.doNotFuckWithMe()
    this.load()
  }

  ngOnInit(): void {
  }

  async bindEvents(){
    let self = this
    window.addEventListener('load', (event) => {
      self.scanCode()
    });

  }

  async load(){
    await this.bindEvents()

  }

  async scanCode(){

    let width  = document.getElementById('reader').offsetWidth
    let height = document.getElementById('reader').offsetHeight

    let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: {width: width, height: height} },
    /* verbose= */ false)

    html5QrcodeScanner.render(onScanSuccess, null)

    function onScanSuccess(decodedText, decodedResult) {
        // Handle on success condition with the decoded text or result.
        console.log( decodedText.split('/') )
        if( decodedText.split('/')[2] === 'api.boxhouse' && decodedText.split('/')[3] === 'box' && parseInt( decodedText.split('/')[4] ) )
          window.location.href = settings.url.frontend+'/boxsingle/'+ decodedText.split('/')[4]
    }

    // function onScanError(errorMessage) {
    //     alert("Le QR code n'est pas valide veuillez réessayer")
    // }

  }
}
