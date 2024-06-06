import { Component } from '@angular/core';
import { UserDataservice } from '../services/UserData.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  firstName: string = '';
  email: string = '';
  personalNumber: string = '';
  lastName: string = '';
  password: string = '';
  passwordsecond: string = '';
  showRegistrationForm: boolean = true;
  show_succes_Reg: boolean = false;
  erroralert: boolean = false;
  error: string = '';
  userRole: string = '0';

  constructor(
    private Userdata: UserDataservice, private router: Router
  ) { }



  register() {
    if (
      this.firstName === '' ||
      this.lastName === '' ||
      this.email === '' ||
      this.personalNumber === '' ||
      this.password === '' ||
      this.passwordsecond === ''
    ) {
      this.error = 'გთხოვთ შეავსოთ ყველა ველი';
      this.erroralert = true;
    } 
    else if(this.Userdata.isPersonalNumberRegistered(this.personalNumber)){
      this.error = 'პირადი ნომერი უკვე რეგისტრირებულია';
      this.erroralert = true;

    }
    else if(this.Userdata.isEmailRegistered(this.email)){
      this.error = ` ელ-ფოსტა - ${this.email} უკვე რეგისტრირებულია`;
      this.erroralert = true;

    }
    else if (this.password !== this.passwordsecond) {
      this.error = 'პაროლები არ ემთხვევა';
      this.erroralert = true;
    }
     else {
      this.Userdata.addRegistration([
        this.firstName,
        this.lastName,
        this.email,
        this.personalNumber,
        this.password,
        this.userRole
      ]);
      this.showRegistrationForm = false;
      this.show_succes_Reg = true;
      this.erroralert = false;
    }
  }





  Navigate_tosignin() {
    this.router.navigate(['']);

  }
}
