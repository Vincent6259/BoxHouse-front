import { Component, OnInit } from '@angular/core';
import Toolbox               from '../../assets/shared/js/Toolbox.js'

@Component({
  selector: 'app-scan',
  templateUrl: './template.html',
  styleUrls: ['./template.css']
})
export class ScanComponent implements OnInit {
  private toolbox = new Toolbox()

  constructor() {
    this.toolbox.doNotFuckWithMe()
   }

  ngOnInit(): void {
  }
}
