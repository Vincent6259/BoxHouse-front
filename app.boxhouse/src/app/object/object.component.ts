import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-object',
  templateUrl: './template.html',
  styleUrls: ['./template.css']
})
export class ObjectComponent implements OnInit {
  private object
  constructor() { 
    this.object = [ /*
      { pk_id:1, name:'Câble RJ-45 5 mètres', fk_box_id:'5'},
      { pk_id:2, name:'Factures EDF', fk_box_id:'2'},
      { pk_id:3, name:'Impôts', fk_box_id:'2'},
      { pk_id:4, name:'Jeu PS3', fk_box_id:'3'},
      { pk_id:5, name:'Cannes à pêche', fk_box_id:'1'},
      { pk_id:6, name:'Bouchons et hameçons', fk_box_id:'1'},
      { pk_id:7, name:'Bandes dessinées', fk_box_id:'4'},
      { pk_id:8, name:'Console PS3', fk_box_id:'3'},
      { pk_id:9, name:'Fiches de paie', fk_box_id:'2'}
      */
    ]

  }

  ngOnInit(): void {
  }


}
