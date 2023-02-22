import Toolbox       from '../../shared/js/Toolbox.js'
import { settings }  from '../../settings.js'
import { bhouse }    from '../../bhouse.js'

export default class PageLogin {
  
  constructor(){
    // -- Properties
    let self     = this
    this.data    = null
    this.toolbox = new Toolbox()
    this.name    = "PageLogin"
  }

  async bindEvents(){
    let self         = this // Do this in addEventListener because either u'll lose the context ( Evan je t'expliquerais )
    let login_button = document.getElementById('PageLogin_submit') 
    let el_mail      = document.getElementById('PageLogin_mail')   
    let el_pass      = document.getElementById('PageLogin_pass') 
    
    login_button.addEventListener('click', async function(e){
      if( el_mail.value < 5 ){
        alert("Veuillez saisir une addresse mail valide")
        return 0
      }else if( el_pass.value < 1 ){
        alert("Veuillez saisir votre mot de passe")
        return 0
      }else if( el_pass.value < 1 && el_mail.value < 5 ){
        alert("Veuillez saisir des identifiants valide")
        return 0
      }
      
      return await self.doLogin(el_mail.value, el_pass.value)
      
    })

  }

  async doLogin(mail, pass){
    let el_error = document.getElementsByClassName('error')[0] 
    this.data    = await bhouse.core.database.get({ collection:'user', mail:mail, pass:pass, })
    if(this.data !== 'nok_user'){
      el_error.style.display = "none"
      el_error.innerHTML  = ""
      await bhouse.core.auth.createSession(this.data.pk_id,this.data.mail,this.data.firstname,this.data.lastname)
      await bhouse.components.PagesManager.show({ page:'PageHome',animate:true, direction: 'right' })
    }else{
      el_error.style.display = "block"
      el_error.innerHTML  = "IDENTIFIANTS INVALIDES"
    }
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

