import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { DropdownsData, SelectedDropdownsData } from '../../interfaces/Dashboard';
import { DashboardDataService } from '../../services/dashboard-data.service';

@Component({
  selector: 'dashboard-lists',
  templateUrl: './dashboard-lists.component.html',
  styleUrls: ['./dashboard-lists.component.scss']
})
export class DashboardListsComponent implements OnInit, OnDestroy {
  private alive: boolean = true;
  groupedData: any;
  dropdownsData: DropdownsData = { countries: [], camps: [], schools: [] }
  selectedDropdownsData: SelectedDropdownsData = { country: '', camp: '', school: '' }

  constructor(
    private dataService: DashboardDataService,
    public translation: TranslationService
  ) { }

  ngOnInit(): void {
    if (this.dataService.groupedData) {
      this.setPreservedData();
      this.dataService.emitSelectedGroupedBySchools(this.selectedGroupedBySchools);
    }
    else this.setData();
  }

  private setPreservedData(): void {
    this.groupedData = this.dataService.groupedData;
    this.dropdownsData = { ...this.dataService.dropdownsData }
    this.selectedDropdownsData = { ...this.dataService.selectedDropdownsData }
  }

  private setData(): void {
    this.dataService.getData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data: any) => {
        this.setGroupedData(data);
        this.setCountries();
      });
  }

  private setGroupedData(data: any): void {
    this.groupedData = data;
  }

  private setCountries(): void {
    this.dropdownsData.countries = Object.keys(this.groupedData);
  }

  onChangeCountry(): void {
    this.setCamps();
    this.resetSelectedCamp();
    this.resetSchools();
    this.resetSelectedSchool();
  }

  onChangeCamp(): void {
    this.setSchools();
    this.resetSelectedSchool();
  }

  onChangeSchool(): void {
    this.dataService.setDropdownsData({ ...this.dropdownsData });
    this.dataService.setSelectedDropdownsData({ ...this.selectedDropdownsData });
    this.dataService.emitSelectedGroupedBySchools(this.selectedGroupedBySchools);
  }

  private setCamps(): void {
    const selectedCountryObj = this.groupedData[this.selectedDropdownsData.country];
    this.dropdownsData.camps = Object.keys(selectedCountryObj);
  }

  private setSchools(): void {
    const selectedCampObj = this.groupedData[this.selectedDropdownsData.country][this.selectedDropdownsData.camp];
    this.dropdownsData.schools = Object.keys(selectedCampObj);
  }

  private resetSelectedCamp(): void {
    this.selectedDropdownsData.camp = '';
  }

  private resetSchools(): void {
    this.dropdownsData.schools = [];
  }

  private resetSelectedSchool(): void {
    this.selectedDropdownsData.school = '';
    this.dataService.emitSelectedGroupedBySchools(null);
  }

  private get selectedGroupedBySchools(): any {
    const selectedCampObj = this.groupedData[this.selectedDropdownsData.country][this.selectedDropdownsData.camp];
    if (this.selectedDropdownsData.school === 'all') return selectedCampObj;
    return { [this.selectedDropdownsData.school]: selectedCampObj[this.selectedDropdownsData.school] };
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
