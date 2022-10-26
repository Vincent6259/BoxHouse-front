import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './template.html',
  styleUrls: ['./template.css']
})
export class LoginComponent implements OnInit {
  private users;

  constructor(){
    // -- Properties
    this.users = [
      {
        firstname:"",
        lastname: "",
        mail: "",
      },
    ]
  }

  ngOnInit(): void {
  }

}
