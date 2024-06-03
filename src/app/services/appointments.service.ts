import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';


export interface Appointment {
  userId: string;
  branchId: string;
  date: string;
  time: string;
  service: string;
  address: string;
  city: string;
  photo: string;
  status: number;
}

interface MyDB extends DBSchema {
  appointments: {
    key: string;
    value: Appointment
    indexes: { 'by-userId': string };
  };
}


@Injectable({
  providedIn: 'root'
})


export class AppointmentService {

  private dbPromise: Promise<IDBPDatabase<MyDB>>;



  constructor() {
    this.dbPromise = this.initDB();

  }

  // addAppointment(appointment: Appointment) {
  //   this.appointments.push(appointment);
  //   console.log('Appointment added:', appointment);
  // }

  // getAppointments(userId: string): Appointment[] {
  //   console.log(this.appointments.filter(appointment => appointment.userId === userId))
  //   return this.appointments.filter(appointment => appointment.userId === userId);
  // }


  // getAllAppointment(): Appointment[] {
  //   return this.appointments;
  // }



  // updateAppointmentStatus(appoint  :any): void {
  //   const appointment = this.appointments.find(app => app.userId === appoint.userId);
  //   if (appointment) {
  //     appointment.status = appoint.status;
  //   }

  // }

  private async initDB(): Promise<IDBPDatabase<MyDB>> {
    return openDB<MyDB>('appointments-db', 1, {
      upgrade(db) {
        const store = db.createObjectStore('appointments', { keyPath: 'id', autoIncrement: true });
        store.createIndex('by-userId', 'userId');
      },
    });
  }



  async getAppointments(userId: string): Promise<Appointment[]> {
    const db = await this.dbPromise;
    return db.getAllFromIndex('appointments', 'by-userId', userId);
  }
  
  async getAllAppointments(): Promise<Appointment[]> {
    const db = await this.dbPromise;
    return db.getAll('appointments');
  }

  async addAppointment(appointment: Appointment): Promise<void> {
    const db = await this.dbPromise;
    await db.add('appointments', appointment);
    console.log('Appointment added:', appointment);
  }

  async updateAppointmentStatus(userId: string, date: string, time: string, branch:string, status: number): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('appointments', 'readwrite');
    const store = tx.objectStore('appointments');
    const index = store.index('by-userId');
    const appointments = await index.getAll(userId);
    console.log(appointments);
  
    const appointment = appointments.find(app => app.date === date && app.time === time && app.branchId === branch);
  
    if (appointment) {
      appointment.status = status;
      await store.put(appointment);
    }
  
    await tx.done;
  }
  



}
