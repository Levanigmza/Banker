import { Component } from '@angular/core';
import { BranchService, Branch } from '../services/BankBranchs.service';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent {
  chooseBank: boolean = true
  bog: boolean = false
  tbc: boolean = false

  loading: boolean = false;
  onlyOpen: boolean = false;
  isappointmentOpen: boolean = false;

  branches: Branch[] = [];
  filteredBranches: Branch[] = [];
  displayBranches: Branch[] = [];
  displayBranchesTbc: Branch[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  cities: string[] = [];
  selectedCity: string = '';
  selectedServices: string[] = [];
  allServices: string[] = [];
  selectedBranch: any;

  activeCategory: string = 'all';

  private displayCount: number = 10;

  constructor(private branchService: BranchService) { }

  ngOnInit(): void {
    this.loading = true;

    this.branchService.getBranches().subscribe(response => {
      this.branches = response.data.filter(branch => branch.cityGe !== null)
        .map(branch => {
          if (!branch.photos) {
            branch.photos = this.branchService.getRandomImage();
          }
          return branch;
        });
      this.filteredBranches = [...this.branches];
      this.displayBranches = this.filteredBranches.slice(0, this.displayCount);
      this.cities = [...new Set(this.branches.map(branch => branch.cityGe))];
      this.allServices = [...new Set(this.branches.flatMap(branch => branch.services.map(service => service.serviceName)))];
      this.loading = false;

    });
    // setTimeout(() => {
    //   this.loading = false;
    // }, 3000);
  }


  filterByCategory(category: string): void {
    this.activeCategory = category;
    this.filteredBranches = this.branches.filter(branch => {
      const cityMatch = branch.cityGe !== null && (this.selectedCity ? branch.cityGe === this.selectedCity : true);
      const serviceMatch = this.selectedServices.length ? branch.services.some(service => this.selectedServices.includes(service.serviceName)) : true;
      return cityMatch && serviceMatch && branch.services.some(service => service.serviceName === category);
    });
    this.currentPage = 1;
    this.updateDisplayBranches();
  }

  showAll(category: string): void {
    this.activeCategory = category;
    this.filteredBranches = this.branches.filter(branch => {
      const cityMatch = branch.cityGe !== null && (this.selectedCity ? branch.cityGe === this.selectedCity : true);
      const serviceMatch = this.selectedServices.length ? branch.services.some(service => this.selectedServices.includes(service.serviceName)) : true;
      return cityMatch && serviceMatch;
    });
    this.currentPage = 1;
    this.updateDisplayBranches();
  }

  showopen(category: string): void {
    this.activeCategory = this.activeCategory === category ? 'all' : category;
    this.onlyOpen = this.activeCategory === 'open';
    this.filteredBranches = this.branches.filter(branch => {
      const cityMatch = branch.cityGe !== null && (this.selectedCity ? branch.cityGe === this.selectedCity : true);
      const isOpen = !this.onlyOpen || branch.available;

      return cityMatch && isOpen;
    });
    this.currentPage = 1;
    this.updateDisplayBranches();
  }

  filterBranches(): void {


    this.filteredBranches = this.branches.filter(branch => {
      const cityMatch = branch.cityGe !== null && (this.selectedCity ? branch.cityGe === this.selectedCity : true);
      const serviceMatch = this.selectedServices.length ? branch.services.some(service => this.selectedServices.includes(service.serviceName)) : true;
      // branch.available = false;
      return cityMatch && serviceMatch;
    });
    this.currentPage = 1;
    this.updateDisplayBranches();
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }


  updateDisplayBranches(): void {
    const endIndex = this.currentPage * this.itemsPerPage;
    this.displayBranches = this.filteredBranches.slice(0, endIndex);
  }

  loadMore(): void {
    this.currentPage++;
    this.updateDisplayBranches();
  }


  Makeappointment(branch: any): void {
    this.isappointmentOpen = true
    this.selectedBranch = branch;
  }

  close_appointment() {
    this.isappointmentOpen = false;
  }

  returnBack() {
    this.chooseBank = true;
    this.tbc = false
    this.bog = false
  }

  loadtbc() {
    this.chooseBank = false;
    this.tbc = true
    this.bog = false

  }

  loadbog() {
    this.chooseBank = false;
    this.tbc = false
    this.bog = true
  }
}
