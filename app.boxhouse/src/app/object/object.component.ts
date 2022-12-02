import { Component, OnInit } from '@angular/core';
import Toolbox               from '../../assets/shared/js/Toolbox.js'

@Component({
  selector: 'app-object',
  templateUrl: './template.html',
  styleUrls: ['./template.css']
})
export class ObjectComponent implements OnInit {

  private toolbox = new Toolbox()
  constructor() {
    this.toolbox.doNotFuckWithMe()
  }

  ngOnInit(): void {
  }


}
