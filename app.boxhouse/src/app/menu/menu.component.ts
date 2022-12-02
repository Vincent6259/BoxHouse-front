import { Component, OnInit } from '@angular/core';
import Toolbox from '../../assets/shared/js/Toolbox.js'
const settings = require('../../settings.js')

@Component({
  selector: 'app-menu',
  templateUrl: './template.html',
  styleUrls: ['./template.css']
})
export class MenuComponent implements OnInit {
  private toolbox = new Toolbox();

  constructor() { }

  ngOnInit(): void {
    this.load()
    this.bindEvents()
  }
  async bindEvents(){
    let self = this

    let button_account = document.getElementsByTagName('menu')[0].getElementsByTagName('button')[0]
    let button_home    = document.getElementsByTagName('menu')[0].getElementsByTagName('button')[1]
    let button_box     = document.getElementsByTagName('menu')[0].getElementsByTagName('button')[2]
    let button_object  = document.getElementsByTagName('menu')[0].getElementsByTagName('button')[3]
    let button_qrcode  = document.getElementsByTagName('menu')[0].getElementsByTagName('button')[4]
    let button_scan    = document.getElementsByTagName('menu')[0].getElementsByTagName('button')[5]

    button_account.addEventListener('click', function(e){
      window.location.href = settings.url.frontend+'/account'
    })
    button_home.addEventListener('click', function(e){
      window.location.href = settings.url.frontend+'/home'
    })
    button_box.addEventListener('click', function(e){
      window.location.href = settings.url.frontend+'/box'
    })
    button_object.addEventListener('click', function(e){
      window.location.href = settings.url.frontend+'/account'
    })
    button_qrcode.addEventListener('click', function(e){
      window.location.href = settings.url.frontend+'/qrcode'
    })
    button_scan.addEventListener('click', function(e){
      window.location.href = settings.url.frontend+'/account'
    })

  }
  async load(){

    await this.loadColors()
    await this.loadSegment()
  }
  async loadColors(){
    let filter_color = await this.toolbox.hexToFilter("#FFFFFF")
    let buttons      = document.getElementsByTagName('menu')[0].getElementsByTagName('button')
    for(let i = 0; i < 4; i++ ){
      buttons[i].getElementsByTagName('img')[0].style.filter = filter_color.split(':')[1].slice(0, -1)
    }

  }

  async loadSegment(){
    if(window.location.href.includes('account'))
      this.loadBar(0)
    if(window.location.href.includes('home'))
      this.loadBar(1)
    if(window.location.href.includes('box'))
      this.loadBar(2)
    if(window.location.href.includes('object'))
      this.loadBar(3)
    if(window.location.href.includes('qrcode'))
      this.loadBar(4)
    if(window.location.href.includes('scan'))
      this.loadBar(5)
  }
  async loadBar(number){
    document.getElementsByClassName('bar')
  }

}
