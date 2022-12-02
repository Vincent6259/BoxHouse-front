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
    this.box = [ /*
      { pk_id:1, name:'Couteaux/Fourchettes', type:'kitchen', objects: [1,2] },
      { pk_id:2, name:'PQ & other', type:'toilet', objects: [3,4] },
      { pk_id:3, name:'Assiettes', type:'dining-room', objects: [5,6] },
      { pk_id:4, name:'Savonnette', type:'bathroom', objects: [7,8] },
      { pk_id:5, name:'Canapé', type:'living-room', objects: [9,10] },
      { pk_id:6, name:'Pelle', type:'garden', objects: [11,12] },
      { pk_id:7, name:'Mamie', type:'attic', objects: [12,14] },
      { pk_id:8, name:'PS6', type:'high-tech', objects: [15,16] },
      { pk_id:9, name:'Kamasutra', type:'book', objects: [17,18] },
      */
    ]

    this.colors = [
      /*
      { pk_id:1, color:'#1afa7c', type:'kitchen' },
      { pk_id:2, color:'#e450dd', type:'toilet'},
      { pk_id:3, color:'#295dff', type:'dining-room'},
      { pk_id:4, color:'#3ca3f9', type:'bathroom'},
      { pk_id:5, color:'#a70dc2', type:'living-room'},
      { pk_id:6, color:'#14a906', type:'garden'},
      { pk_id:7, color:'#dd1818', type:'attic'},
      { pk_id:8, color:'#f9b73c', type:'high-tec'},
      { pk_id:9, color:'#6f5555', type:'book'},
      */
    ]
  }

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
    console.log(qrcode)
  }

  async loadList(){
    let self = this

    let list   = document.getElementById('PageQRcode_boxlist')
    let el_box = null

    // BOX
    for( let box of this.box ){
        // Vars
        el_box = document.createElement('div')
        list.appendChild(el_box)
        el_box.outerHTML   = await this.generateBoxHTML(box)
        el_box             = list.lastElementChild // need after outerhtml
        this.loadBoxColor(el_box,box) // Load pictures async
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
