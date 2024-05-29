import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


export interface Appointment {
  userId: string;
  branchId: number;
  date: string;
  time: string;
  service: string;
  address: string;
  city: string;
  photo: string;
  status: number;
}


@Injectable({
  providedIn: 'root'
})


export class AppointmentService {



  private appointments: Appointment[] = [];

  constructor() {
  }

  addAppointment(appointment: Appointment) {
    this.appointments.push(appointment);
    console.log('Appointment added:', appointment);
  }

  getAppointments(userId: string): Appointment[] {
    console.log(this.appointments.filter(appointment => appointment.userId === userId))
    return this.appointments.filter(appointment => appointment.userId === userId);
  }


  getAllAppointment(): Appointment[] {
    return this.appointments;
  }

  updateAppointmentStatus(appoint  :any): void {
    const appointment = this.appointments.find(app => app.userId === appoint.userId);
    if (appointment) {
      appointment.status = appoint.status;
    }

  }



}
