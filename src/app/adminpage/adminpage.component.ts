import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataservice } from '../services/UserData.service';
import { AppointmentService, Appointment } from '../services/appointments.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  userName : string = ''
  userSurname: string = ''

  appointments: Appointment[] = [];


  constructor(private router: Router, private Userdata: UserDataservice, private appointmentService: AppointmentService) { }


  ngOnInit(): void {
    this.appointments = this.appointmentService.getAllAppointment();
    console.log(this.appointmentService.getAllAppointment())
    
  }

  getUserName(userId: string): string {
    const user = this.Userdata.getRegistrations().find(reg => reg[3] === userId);
    return user ? `${user[0]} ${user[1]}` : 'Unknown User';
  }
    signOut() {

      this.Userdata.clearLocalStorage()
    }

    getStatusText(status: number): string {
      switch (status) {
        case 1:
          return 'მიმდინარე';
        case 2:
          return 'დადასტურებული';
        case 3:
          return 'უარყოფილი';
        default:
          return 'Unknown Status';
      }
    }

    approveAppointment(appointment: Appointment): void {
      appointment.status = 2;
      this.appointmentService.updateAppointmentStatus(appointment )
    }
  
    declineAppointment(appointment: Appointment): void {
      appointment.status = 0;
    }
  }
