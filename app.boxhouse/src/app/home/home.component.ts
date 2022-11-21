import { Component, OnInit } from '@angular/core'
const settings = require('../../settings.js')

@Component({
  selector: 'app-home',
  templateUrl: './template.html',
  styleUrls: ['./template.css']
})
export class HomeComponent implements OnInit {

  private session

  constructor() {
  }

  ngOnInit(): void {
    this.session = JSON.parse(sessionStorage.getItem('session'))
    console.log(this.session)
  }

}
