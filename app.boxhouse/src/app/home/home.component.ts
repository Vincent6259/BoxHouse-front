import { Component, OnInit } from '@angular/core'
import Toolbox               from '../../assets/shared/js/Toolbox.js'
const settings = require('../../settings.js')

@Component({
  selector: 'app-home',
  templateUrl: './template.html',
  styleUrls: ['./template.css']
})
export class HomeComponent implements OnInit {

  private session
  private buttons
  private toolbox = new Toolbox()

  constructor() {
  }

  ngOnInit(): void {
    this.session = JSON.parse(sessionStorage.getItem('session'))
    console.log(this.session)
    this.load()
  }

  async bindEvents(){
    for(let button of this.buttons){
      button.el.addEventListener('click', function(e){
        window.location.href = settings.url.frontend+''+button.link
      })
    }
  }

  async load(){
    this.buttons = [
      {
        el    :document.getElementsByClassName('card')[0],
        color :'#A64253',
        link  : '/account',
      },
      {
        el    :document.getElementsByClassName('card')[1],
        color :'#d8a870',
        link  : '/object',
      },
      {
        el    :document.getElementsByClassName('card')[2],
        color :'#BBDBB4',
        link  : '/box',
      },
      {
        el    :document.getElementsByClassName('card')[3],
        color :'#9181fa',
        link  : '/qrcode',
      },
      {
        el    :document.getElementsByClassName('card')[4],
        color :'#9181fa',
        link  : '/scan',
      },
    ]

    await this.loadColor()
    await this.bindEvents()

  }

  async loadColor(){
    let filter = null
    for(let i = 0; i < this.buttons.length; i++){
      if(i < 3){
        filter = await this.toolbox.hexToFilter('#FFFFFF')
        this.buttons[i].el.getElementsByTagName('img')[0].style.filter = filter.split(':')[1].slice(0, -1)
      }
      this.buttons[i].el.style.backgroundColor = this.buttons[i].color
    }


  }

}
