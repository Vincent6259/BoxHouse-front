import { Component, OnInit } from '@angular/core';
import { Auth } from '../core/Auth';
const settings = require('../../settings.js')
@Component({
  selector: 'app-account',
  templateUrl: './template.html',
  styleUrls: ['./template.css']
})
export class AccountComponent implements OnInit {
  private session
  private auth = new Auth()

  constructor(){}

  ngOnInit(): void {
    this.session = JSON.parse(sessionStorage.getItem('session'))
    this.load()
  }
  async load(){
    await this.bindEvents()
    await this.loadMail()
    await this.loadFirstname()
    await this.loadLastname()
  }
  async logout(){
    //this.session = null
    sessionStorage.clear()
  }

  async loadMail(){
    let self = this
    let el   = document.getElementById('PageAccount_mail')
    console.log(this.session.core.auth.mail)
    el.innerHTML = this.session.core.auth.mail
  }

  async loadFirstname(){
    let self = this
    let el   = document.getElementById('PageAccount_firstname')
    console.log(this.session.core.auth.firstname)
    el.innerHTML = this.session.core.auth.firstname
  }
  async loadLastname(){
    let self = this
    let el   = document.getElementById('PageAccount_lastname')
    console.log(this.session.core.auth.lastname)
    el.innerHTML = this.session.core.auth.lastname
  }

  async bindEvents(){
    let self = this
    let logout_button = document.getElementById('PageLogout_submit') as any

    logout_button.addEventListener('click', async function(e) {
      await self.doLogout()
      window.location.href = settings.url.frontend+'/'
    })

  }

    async doLogout(){
      await this.auth.disconnect()
    }


}
