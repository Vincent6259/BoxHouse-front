import { Component, OnInit } from '@angular/core'
import { Auth }              from '../core/Auth'
const settings = require('../../settings.js')

@Component({
  selector: 'app-home',
  templateUrl: './template.html',
  styleUrls: ['./template.css']
})
export class HomeComponent implements OnInit {

  constructor(private housebox: Auth) {
    console.log(this.housebox.session)
  }

  ngOnInit(): void {
  }

}
