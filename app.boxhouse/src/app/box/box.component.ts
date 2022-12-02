import { Component, OnInit } from '@angular/core';
import Toolbox               from '../../assets/shared/js/Toolbox.js'



@Component({
  selector: 'app-box',
  templateUrl: './template.html',
  styleUrls: ['./template.css']
})
export class BoxComponent implements OnInit {
  private toolbox = new Toolbox()
  constructor() {
    this.toolbox.doNotFuckWithMe()
   }

  ngOnInit(): void {
  }

}
