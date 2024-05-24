import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Service {
    serviceId: number;
    serviceName: string;
    customerType: string;
  }
  
  export interface Schedule {
    workingDayGroupName: string;
    workingHoursName: string;
  }
  
  export interface Branch {
    addressGe: string;
    cityGe: string;
    objectSchedule: Schedule[];
    services: Service[];
    available: boolean;
    photos: string | null;
  }


@Injectable({
  providedIn: 'root'
})

export class BranchService {
    private apiUrl = 'https://bankofgeorgia.ge/api/locations/searchLocations';
    private branchImages = [
        'assets/branch1.png',
        'assets/branch2.png',
        'assets/branch3.png',
        'assets/branch4.png',
        'assets/branch5.png',
        'assets/branch6.png',
      ];
    constructor(private http: HttpClient) {

    }
  
    getBranches(): Observable<{ data: Branch[] }> {
      const body = {
        objectType: "SC",
        isBOG: true,
        isEXP: false,
        isSOL: false,
        isGel: false,
        isUsd: false,
        isEuro: false,
        city: null,
        worksFullTime: false,
        openNow: false,
        isAdapted: false,
        searchWord: "",
        offset: null,
        limit: null,
        needDetails: true
      };
      return this.http.post<{ data: Branch[] }>(this.apiUrl, body);
    }

    getRandomImage(): string {
        const randomIndex = Math.floor(Math.random() * this.branchImages.length);
        return this.branchImages[randomIndex];
      }
}
