import { Component, OnInit } from '@angular/core';
import { Appointment, AppointmentService } from '../services/appointments.service';

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css']
})
export class UserAppointmentsComponent implements OnInit {
  userAppointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    const user = localStorage.getItem('UserId');
    if (user) {
      this.userAppointments = this.appointmentService.getAppointments(user );
    } else {
      console.log('UserID not found in localStorage');
    }


  }
}
