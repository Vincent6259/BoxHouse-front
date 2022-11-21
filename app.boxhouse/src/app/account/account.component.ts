import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './template.html',
  styleUrls: ['./template.css']
})
export class AccountComponent implements OnInit {
  private session

  constructor() {

  }

  ngOnInit(): void {
    this.session = JSON.parse(sessionStorage.getItem('session'))
    this.load()
  }
  async load(){
    await this.loadMail()
    await this.loadFirstname()
  }
  async logout(){
    this.session = null
  }

  async loadMail(){}

  async loadFirstname(){
    let self = this
    let el   = document.getElementById('PageAccount_firstname')
    console.log(this.session.core.auth.firstname)
    el.innerHTML = this.session.core.auth.firstname
  }

}
