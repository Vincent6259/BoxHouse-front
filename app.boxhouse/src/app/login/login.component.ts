import { Component, OnInit } from '@angular/core'
import { Auth }              from '../core/Auth'
import { Database }          from '../core/Database.js'
import Toolbox               from '../../assets/shared/js/Toolbox.js'
const settings  = require('../../settings.js') // ALWAYS IMPORT

@Component({
  selector: 'app-login',
  templateUrl: './template.html',
  styleUrls: ['./template.css']
})
export class LoginComponent implements OnInit {
  private data;
  private database = new Database()
  private toolbox  = new Toolbox()

  constructor(private auth: Auth){
    // -- Properties
    this.data = null
    this.toolbox.doNotFuckWithMe()
  }

  ngOnInit(): void {
    this.bindEvents()
  }

  async bindEvents(){
    let self         = this // Do this in addEventListener because either u'll lose the context ( Evan je t'expliquerais )
    let login_button = document.getElementById('PageLogin_submit') as any // Remove Error "property does not exist on value of type"
    let el_mail      = document.getElementById('PageLogin_mail')   as any // Remove Error "property does not exist on value of type"
    let el_pass      = document.getElementById('PageLogin_pass')   as any // Remove Error "property does not exist on value of type"

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

      await self.doLogin(el_mail.value, el_pass.value)
      return 0

    })

  }

  async doLogin(mail: any, pass: any){
    let el_error = document.getElementsByClassName('error')[0] as any // Remove Error "property does not exist on value of type"
    this.data    = await this.database.get({ collection:'user', mail:mail, pass:pass, })

    if(this.data !== 'nok_user'){
      el_error.style.display = "none"
      el_error.innerHTML  = ""
      await this.auth.createSession(this.data.pk_id,this.data.mail,this.data.firstname,this.data.lastname)
      window.location.href         = settings.url.frontend+'/home'
    }else{
      el_error.style.display = "block"
      el_error.innerHTML  = "IDENTIFIANTS INVALIDES"
    }
  }

}

