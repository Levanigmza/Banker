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

  userName : string = '';
  userSurname: string = '';
  adminName:string = '';
  appointments: Appointment[] = [];

  statusFilter: string = '';
  userIdFilter: string = '';
  nameFilter: string = '';
  surnameFilter: string = '';

  filteredAppointments: Appointment[] = [];


  constructor( private Userdata: UserDataservice, private appointmentService: AppointmentService) { }


  async ngOnInit(): Promise<void> {

    const userID = localStorage.getItem('UserId'); 
    if (userID) {
      this.getUserNameAndSurname(userID);
    } else {
      console.log('UserID not found in localStorage');
    }

    

    this.appointments = await this.appointmentService.getAllAppointments();
    this.filteredAppointments = this.appointments;
    console.log(this.appointments);
  }


  getUserNameAndSurname(email: string): void {
    const user = this.Userdata.getUserNameAndSurname(email);
    if (user) {
      this.adminName = user.name;
      console.log(user)
    } else {
      console.log('User not found');
    }
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
        case 0:
          return 'უარყოფილი';
        default:
          return 'Unknown Status';
      }
    }
    async approveAppointment(appointment: Appointment): Promise<void> {
      appointment.status = 2;
      await this.appointmentService.updateAppointmentStatus(appointment.userId, appointment.date , appointment.time, appointment.branchId,appointment.status );
      this.applyFilters();

    }
  
    async declineAppointment(appointment: Appointment): Promise<void> {
      appointment.status = 0;
      await this.appointmentService.updateAppointmentStatus(appointment.userId, appointment.date , appointment.time, appointment.branchId, appointment.status );
      this.applyFilters();

    }



  applyFilters() {
    this.filteredAppointments = this.appointments.filter(appointment => {
      const matchesStatus = this.statusFilter ? appointment.status === +this.statusFilter : true;
      const matchesUserId = this.userIdFilter ? appointment.userId.includes(this.userIdFilter) : true;
      const matchesName = this.nameFilter ? this.getUserName(appointment.userId).split(' ')[0].includes(this.nameFilter) : true;
      const matchesSurname = this.surnameFilter ? this.getUserName(appointment.userId).split(' ')[1].includes(this.surnameFilter) : true;
      return matchesStatus && matchesUserId && matchesName && matchesSurname;
    });
  }
  }
