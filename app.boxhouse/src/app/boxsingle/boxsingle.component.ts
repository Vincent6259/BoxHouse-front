import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Subscription }      from 'rxjs';
import { Database }          from '../core/Database.js'
import Toolbox               from '../../assets/shared/js/Toolbox.js'
import QRCode                from 'easyqrcodejs'
const settings  = require('../../settings.js') // ALWAYS IMPORT


@Component({
  selector: 'app-boxsingle',
  templateUrl: './template.html',
  styleUrls: ['./template.css']
})
export class BoxSingleComponent implements OnInit {
  private routeSub: Subscription;
  private database = new Database()
  private toolbox  = new Toolbox()
  private id
  private data
  private filter
  private colors

  ngOnInit(): void {
  }

  constructor(private route: ActivatedRoute){
    this.toolbox.doNotFuckWithMe()
    this.routeSub = this.route.params.subscribe(params => { this.id = params['id'] })
    this.colors = [
      { type : 'kitchen',     color: '#3ca3f9' },
      { type : 'high-tech',   color: '#f9b73c' },
      { type : 'garden',      color: '#14a906' },
      { type : 'attic',       color: '#dd1818' },
      { type : 'living-room', color: '#a70dc2' },
      { type : 'book',        color: '#6f5555' },
      { type : 'toilet',      color: '#e450dd' },
      { type : 'dinning-room',color: '#295dff' },
    ]
    this.load()
  }
  async bindEvents(){
    let self = this
  }
  async load(){
    let self = this

    Promise.all([
      await self.loadData(),
      await self.loadColor(),
      await self.loadList(),
    ])
  }

  async loadData(){
    let link = null, color = null
    this.data  = await this.database.get({ collection:'box', pk_id: this.id })

    link = 'http://api.boxhouse/box/'+this.data.pk_id
    for(let c of this.colors)
      c.type === this.data.type ? color = c.color : color = color

    await generateQRcode(link, color)

    async function generateQRcode(link,color){
      document.getElementById("qrcode").innerHTML = ''
      let qrcode = new QRCode(document.getElementById("qrcode"), {
          width: 200,
          height: 200,
          text: link,
          logo: "../../assets/shared/img/img-box.png",
          logoWidth: 80,
          logoHeight: 80,
          colorDark : color,
          colorLight : "#ffffff",
          logoBackgroundTransparent: false
      });
    }
  }
  async loadColor(){
    let color = null
    let el = document.getElementById('logo_box')
    for(let c of this.colors)
      c.type === this.data.type ? color = c.color : color = color

    let filter = await this.toolbox.hexToFilter(color)
    console.log(filter)
    el.style.filter = filter.split(':')[1].slice(0, -1)

  }
  async loadList(){
    let list = document.getElementById('Boxsingle_objects')
    let filter = await this.toolbox.hexToFilter('#FFFFFF')
    filter     = filter.split(':')[1].slice(0, -1)

    for(let object of this.data.objects){
      let el_object         = document.createElement('tmp') as Element
      list.appendChild(el_object)
      el_object.outerHTML   = await this.generateObjectHTML(object)
      el_object             = list.lastElementChild // need after outerhtml
      el_object.getElementsByTagName('img')[0].style.filter = filter
      // Add listeners
      el_object.addEventListener('click', async function(){
        alert('La visualisation de vos objets et en cours de création veuillez réessayer plus tard')
      })
    }
  }

  async generateObjectHTML(object){
        let html =`<row style="display: block; margin:auto; width: 80%; height: 50px; border-bottom: 1px solid white; line-height: 20px;">
                <div style="display: inline-block; vertical-align: center; height: 40px; width: 40px; margin: auto;" class="imgcontainer">
                  <img style="object-fit: cover; width: 40px;" src="../../assets/shared/img/icon-objects.png" />
                </div><!--
                --><div style="display: inline-block; vertical-align: center; width: calc( 50% - 40px);" class="name">${object.name}</div><!--
                --><div style="display: inline-block; vertical-align: center; width: calc( 50% - 40px);" class="quantity">Quantité : ${object.quantity}</div>
              </row>`
    return html
  }



}
