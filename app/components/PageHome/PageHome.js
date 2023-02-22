import Toolbox  from '../../shared/js/Toolbox.js'
import { settings }  from '../../settings.js'

export default class PageHome {


  constructor(bhouse) {
    this.session = null
    this.buttons = null
    this.rounds  = null
    this.toolbox = new Toolbox()
    this.name    = 'PageHome'
  }

  async bindEvents(){
  }

  async load(){
    
    await this.bindEvents()
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
