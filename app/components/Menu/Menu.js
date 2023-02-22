import Toolbox  from '../../shared/js/Toolbox.js'
import { settings }  from '../../settings.js'

export default class Menu {


  constructor(bhouse) {
    this.session = null
    this.buttons = null
    this.rounds  = null
    this.toolbox = new Toolbox()
    this.name    = 'Menu'
  }

  async bindEvents(){
  }

  async load(){
    
    await this.bindEvents()
  }
  
  async showMenu(){
    document.getElementsByTagName('menu')[0].style.opacity       = 1
    document.getElementsByTagName('menu')[0].style.pointerEvents = 'all'
    document.getElementsByTagName('menu')[0].style.display       = 'block'
  }
  
  async hideMenu(){
    document.getElementsByTagName('menu')[0].style.opacity = 0
    document.getElementsByTagName('menu')[0].style.pointerEvents = 'none'
    document.getElementsByTagName('menu')[0].style.display       = 'none'
  }
  async selectSegment(index){
    console.log('index :'+index)
    for(let segment of document.getElementsByClassName('segment'))
      segment.innerHTML = ''
      
    console.log( document.getElementsByClassName('segment')[0] )
    let el = document.getElementsByClassName('segment')[index]
    el.innerHTML = `<div class="selector"></div>`
  }
  async getHtml(){         
    const response = await fetch(settings.url.frontend+"/components/"+this.name+"/template.html")
    const text = await response.text()
    return text
  }
  async getCSS(){
    const response = await fetch(settings.url.frontend+"/components/"+this.name+"/template.css")
    const text = await response.text()
    return text
  } 

}
