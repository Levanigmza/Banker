import { Injectable } from '@angular/core';


export interface Appointment {
    userId: string;
    branchId: number;
    date: string;
    time: string;
    service: string;
    address : string;
    city:string;
    photo:string;
  }
  

@Injectable({
  providedIn: 'root'
})


export class AppointmentService {

    private appointments: Appointment[] = [];

  constructor() {}

  addAppointment(appointment: Appointment) {
    this.appointments.push(appointment);
    console.log('Appointment added:', appointment);
  }

  getAppointments(userId: string): Appointment[] {
    console.log(this.appointments.filter(appointment => appointment.userId === userId))
    return this.appointments.filter(appointment => appointment.userId === userId);
  }
}
