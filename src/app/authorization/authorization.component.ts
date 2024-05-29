import { Component ,Output ,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { UserDataservice } from '../services/UserData.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent {
  email: string = '';
  password: string = '';
  Incorrect: boolean = false;
  Emptycredentials: boolean = false;




  constructor(private router: Router, private userData: UserDataservice ) { }

  signIn() {
    this.Emptycredentials = false;
    this.Incorrect = false;

    if (this.email && this.password) {

      localStorage.clear();

      if (this.userData.validateCredentials(this.email, this.password)) {
        const token = this.userData.generateToken(this.email);
        const userID = this.userData.GetUserID(this.email);


        localStorage.setItem('authToken', token);
        if (userID !== null) {
          localStorage.setItem('UserId', userID);
        }
        if (this.userData.isUser()) {

          this.router.navigate(['/userpage']);
        }
        else if (this.userData.isAdmin()) {

          this.router.navigate(['/adminpage']);
        }
        else{
          this.router.navigate(['/home']);
        }
      } else {
        this.Incorrect = true;
      }
    }
    else {
      this.Emptycredentials = true;
    }
  }

  navigateToRegister() {
    this.router.navigate(['/registration']);
  }
}
