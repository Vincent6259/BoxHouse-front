import Toolbox       from '../../shared/js/Toolbox.js'
import { settings }  from '../../settings.js'
import { bhouse }    from '../../bhouse.js'

export default class PopupScan {
  
  constructor(){
    // -- Properties
    let self     = this
    this.data    = null
    this.toolbox = new Toolbox()
    this.name    = "PopupScan"
  }

  async bindEvents(){
  }

  async show(){
    document.getElementById('popupScan')
    // transform: translate(-50%,-50%);
  }
  
  async hide(){
    
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

