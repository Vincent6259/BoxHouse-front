import { Component, OnInit } from '@angular/core'
import { Auth }              from '../core/Auth'

const settings = require('../../settings.js') // ALWAYS IMPORT

@Component({
  selector: 'app-login',
  templateUrl: './template.html',
  styleUrls: ['./template.css']
})
export class LoginComponent implements OnInit {
  private users;

  constructor(private auth: Auth){
    // -- Properties
    this.users = [
      {
        pk_id:    1,
        firstname:"Gwenaël",
        lastname: "Auger",
        mail: "auger.gwenael@icloud.com",
        password: "AZERTY",
      },
      {
        pk_id:    2,
        firstname:"Evan",
        lastname: "Rougetet",
        mail: "evan.rougetet@spie.com",
        password: "AZERTY",
      },
      {
        pk_id:    3,
        firstname:"Vincent",
        lastname: "Legout",
        mail: "legout.vincent6259@gmail.com",
        password: "AZERTY",
      },
    ]
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
    let el_error     = document.getElementsByClassName('error')[0] as any // Remove Error "property does not exist on value of type"
    for(let user of this.users){
      if(mail == user.mail && pass == user.password){
        el_error.style.display = "none"
        el_error.innerHTML  = ""
        await this.auth.createSession(user.pk_id,user.mail,user.firstname,user.lastname)
        window.location.href         = settings.url.frontend+'/home'
      }else{
        el_error.style.display = "block"
        el_error.innerHTML  = "IDENTIFIANTS INVALIDES"
      }
    }
  }

}

