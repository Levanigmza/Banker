import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { AppointmentService, Appointment } from '../services/appointments.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  @Output() close_appointment_popup: EventEmitter<void> = new EventEmitter<void>();
  @Input() branch: any;

  constructor(private appointmentService: AppointmentService) {
  }

  selectedDate: string = '';
  selectedTime: string = '';
  selectedService: string = '';
  userId: string = '';

  availableDates: string[] = [];
  availableTimes: string[] = [];

  ngOnInit() {
    const user = localStorage.getItem('UserId');
    if (user) {
      this.userId = user;
    } else {
      console.log('UserID not found in localStorage');
    }
    this.updateAvailableDates();
  }

  updateAvailableDates() {
    this.availableDates = [];

    const daysOfWeek = ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formattedDate = this.formatDate(date);
      const dayOfWeek = daysOfWeek[date.getDay()];
      this.availableDates.push(`${formattedDate} ${dayOfWeek}`);
    }
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}-${month}`;
  }


  updateAvailableTimes(branch: any) {
    this.availableTimes = [];


    const selectedDayOfWeek = this.getSelectedDayOfWeek(this.selectedDate);

    switch (selectedDayOfWeek) {
      case 'ორშაბათი':
      case 'სამშაბათი':
      case 'ოთხშაბათი':
      case 'ხუთშაბათი':
      case 'პარასკევი':
        this.generateWeekdayTimes(branch);
        break;
      case 'შაბათი':
        this.generateSaturdayTimes();
        break;
      case 'კვირა':
        this.generateSundayTimes();
        break;
      default:
        break;
    }
  }

  generateSaturdayTimes() {
    this.availableTimes.push('10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30');
  }
  generateSundayTimes() {
    this.availableTimes.push('');
  }
  generateWeekdayTimes(branch: any) {

    const workinghours = branch.objectSchedule[0].workingHoursName;
    console.log(workinghours)

    switch (workinghours) {
      case '9:30-19:00':
        this.availableTimes.push('9:00', '9:30','10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30' , '14:00', '14:30', '15:00', '15:30', '16:00', '16:30' , '17:00', '17:30' ,'18:00', '18:30');
        break;
      case '10:00-18:00':
        this.availableTimes.push('10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30' , '14:00', '14:30', '15:00', '15:30', '16:00', '16:30' , '17:00', '17:30');
        break;
      default:
        this.availableTimes.push('10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30' , '14:00', '14:30', '15:00', '15:30', '16:00', '16:30' , '17:00');
        break;
    }

  }
  getSelectedDayOfWeek(day: string): string {
    const parts = day.split(" ");
    return parts[parts.length - 1];
  }



  closepopup() {
    this.close_appointment_popup.emit();
  }


  makeAppointment() {
    const appointment: Appointment = {
      userId: this.userId,
      branchId: this.branch.objectKey,
      date: this.selectedDate,
      time: this.selectedTime,
      service: this.selectedService
    };

    this.appointmentService.addAppointment(appointment);
    this.closepopup();

    this.appointmentService.getAppointments(this.userId)
  }
}
