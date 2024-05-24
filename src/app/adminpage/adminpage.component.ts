import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { UserDataservice } from '../services/UserData.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent {

  constructor(private router: Router , private Userdata : UserDataservice) { }


  signOut(){

    this.Userdata.clearLocalStorage()
  }
}
