import { Component, OnInit } from '@angular/core';
import { Appointment, AppointmentService } from '../services/appointments.service';
import { BranchService } from '../services/BankBranchs.service';

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css']
})
export class UserAppointmentsComponent implements OnInit {
  userAppointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService, private branchService: BranchService) { }

  ngOnInit(): void {
    const user = localStorage.getItem('UserId');
    if (user) {
      this.userAppointments = this.appointmentService.getAppointments(user);
      this.filteredAppointments = [...this.userAppointments];
    } else {
      console.log('UserID not found in localStorage');
    }

  }

  filterAppointments(filter: string) {
    const daysOfWeek = ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'];

    const today = new Date();
    const formattedDate = this.formatDate(today);
    const dayOfWeek = daysOfWeek[today.getDay()];

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const formattedTomorrow = this.formatDate(tomorrow);
    const tomorrowDayOfWeek = daysOfWeek[tomorrow.getDay()];

    const todayDate = `${formattedDate} ${dayOfWeek}`;
    const tomorrowDate = `${formattedTomorrow} ${tomorrowDayOfWeek}`;
    
    switch (filter) {
      case 'today':
        this.filteredAppointments = this.userAppointments.filter(appointment => appointment.date === todayDate);
        break;
      case 'tomorrow':
        this.filteredAppointments = this.userAppointments.filter(appointment => appointment.date === tomorrowDate);
        break;
      default:
        this.filteredAppointments = [...this.userAppointments];
        break;
    }
  }


  formatDate(date: Date): string {
    const day = (date.getDate()).toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}-${month}`;
  }
}
