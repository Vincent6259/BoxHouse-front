import { Component, OnInit } from '@angular/core'
import QRCode  from 'easyqrcodejs'
import Toolbox from '../../assets/shared/js/Toolbox.js'
const settings = require('../../settings.js')

@Component({
  selector: 'app-qrcode',
  templateUrl: './template.html',
  styleUrls: ['./template.css']
})
export class QRcodeComponent implements OnInit {
  private box;
  private colors;
  private toolbox = new Toolbox();

  constructor(){

    this.toolbox.doNotFuckWithMe()

  }

  ngOnInit(): void {
    this.load()
  }

  async bindEvents(){
    let self = this

    let generateQRcode = document.getElementById('generateQRcode')

    generateQRcode.addEventListener('click', function(e){
        self.generateQRcode('http://api.boxhouse/box/2')
    })
  }

  async load(){

    await this.bindEvents()
    await this.loadList()
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
  }

  async loadList(){
    let self = this

    let list   = document.getElementById('PageQRcode_boxlist')
    let el_box = null

    // BOX
    for( let box of this.box ){
        // // Vars
        // el_box = document.createElement('div')
        // list.appendChild(el_box)
        // el_box.outerHTML   = await this.generateBoxHTML(box)
        // el_box             = list.lastElementChild // need after outerhtml
        // this.loadBoxColor(el_box,box) // Load pictures async
    }
  }

  async generateBoxHTML(box){
    let i    = 0
    /* TEMP */
    for(let object of box.objects)
      i ++
    /*     */
    let types = []
    let html =`
      <div class="row">
        <div class="img-container"><img src="../../assets/shared/img/icon-box.svg"/></div>
        <div class="name">${ box.name }</div>
        <div class="type">${ box.type }</div>
        <div class="object">Il y a ${i} objet(s) associé(s) à cette boite</div>
      </div>
    `
    return html
  }

  async loadBoxColor(el,box){

    let filter_color = null
    for(let color of this.colors){
      if( color.type === box.type)
        filter_color = await this.toolbox.hexToFilter(color.color)
    }
    console.log(el)
    el.getElementsByTagName('img')[0].style.filter = filter_color.split(':')[1].slice(0, -1)
  }

}
