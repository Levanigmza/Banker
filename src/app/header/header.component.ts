import { Component, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { UserDataservice } from '../services/UserData.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userName: string = ''
  isLoggedIn : boolean = false;
  signOut() {

  }
}
