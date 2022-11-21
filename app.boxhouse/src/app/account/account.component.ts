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
  }

  async logout(){
    this.session = null

  }

}
