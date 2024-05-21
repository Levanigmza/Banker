import { Component } from '@angular/core';
import { RouteReuseStrategy, Router } from '@angular/router';
import { UserDataservice } from '../services/UserData.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent {
  constructor(private Userdata : UserDataservice , private router : Router) { }


  signOut(){
    this.Userdata.clearLocalStorage()
  }

  Valute(){
    this.router.navigate(['/valute']);

  }
}
