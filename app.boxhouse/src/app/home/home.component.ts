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
  private cards
  private rounds
  private toolbox = new Toolbox()

  constructor() {
  }

  ngOnInit(): void {
    this.session = JSON.parse(sessionStorage.getItem('session'))
    console.log(this.session)
    this.load()
  }

  async bindEvents(){
    for(let card of this.cards){
      card.el.addEventListener('click', function(e){
        window.location.href = settings.url.frontend+''+card.link
      })
    }

    for(let round of this.rounds){
      round.el.addEventListener('click', function(e){
        window.location.href = settings.url.frontend+''+round.link
      })
    }
  }

  async load(){
    this.cards = [
      {
        el    :document.getElementsByClassName('card')[0],
        color :'#d8a870',
        link  : '/object',
      },
      {
        el    :document.getElementsByClassName('card')[1],
        color :'#BBDBB4',
        link  : '/box',
      },
      {
        el    :document.getElementsByClassName('card')[2],
        color :'#9181fa',
        link  : '/qrcode',
      },
      {
        el    :document.getElementsByClassName('card')[3],
        color :'#aab7b8',
        link  : '/warehouse',
      },
    ]

    this.rounds = [
      {
        el    :document.getElementsByClassName('round')[0],
        color :'#A64253',
        link  : '/account',
      },
      {
        el    :document.getElementsByClassName('round')[1],
        color :'#9181fa',
        link  : '/scan',
      },
    ]

    await this.loadCardColor()
    await this.loadRoundColor()
    await this.bindEvents()

  }

  async loadCardColor(){
    let filter = null
    for(let i = 0; i < this.cards.length; i++){
      if( i !== 2 && i !== 3 ){
        filter = await this.toolbox.hexToFilter('#FFFFFF')
        this.cards[i].el.getElementsByTagName('img')[0].style.filter = filter.split(':')[1].slice(0, -1)
      }
      this.cards[i].el.style.backgroundColor = this.cards[i].color

    }
  }

  async loadRoundColor(){
    let filter = null
    for(let i = 0; i < this.rounds.length; i++){
      if( i !== 1){
        filter = await this.toolbox.hexToFilter('#FFFFFF')
        this.rounds[i].el.getElementsByTagName('img')[0].style.filter = filter.split(':')[1].slice(0, -1)
      }
      this.rounds[i].el.style.backgroundColor = this.rounds[i].color

    }
  }

}
