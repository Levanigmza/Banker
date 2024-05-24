import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataservice } from '../services/UserData.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent  implements OnInit{

  valuteload: boolean = false
  banksload: boolean = false
  reservationsload : boolean = false



  userName : string = ''
  userSurname : string = ''
  menuVisible = false;

  constructor(private Userdata: UserDataservice, private router: Router) { }


  ngOnInit(): void {
    this.banksload =true
    const userID = localStorage.getItem('UserId'); 
    if (userID) {
      this.getUserNameAndSurname(userID);
    } else {
      console.log('UserID not found in localStorage');
    }
  }

  getUserNameAndSurname(email: string): void {
    const user = this.Userdata.getUserNameAndSurname(email);
    if (user) {
      this.userName = user.name;
      this.userSurname = user.surname;
    } else {
      console.log('User not found');
    }
  }

  signOut() {
    this.Userdata.clearLocalStorage()
  }

  valute() {
    this.valuteload = true;
    this.banksload = false;
    this.reservationsload = false

   }

  banks() {
    this.valuteload = false;
    this.banksload = true;
    this.reservationsload = false

  }

  reservations(){
    this.valuteload = false;
    this.banksload = false;
    this.reservationsload = true
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
}
