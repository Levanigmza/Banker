import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataservice } from 'src/app/services/UserData.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  Currency: string = '';
  constructor(private userData : UserDataservice , private router: Router){}

ngOnInit(): void {
  this.Currency = "usd";
}
Back(){

  if (this.userData.isUser()) {

    this.router.navigate(['/userpage']);
  }
  else if (this.userData.isAdmin()) {

    this.router.navigate(['/adminpage']);
  }
}

}