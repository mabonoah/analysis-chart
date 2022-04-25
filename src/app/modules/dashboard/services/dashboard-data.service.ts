import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { ApiService } from 'src/app/core/http/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { DataItem, DropdownsData, SelectedDropdownsData } from '../interfaces/Dashboard';
const dataURL: string = 'https://raw.githubusercontent.com/mabonoah/analytics-dashboard/main/data.json';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {

  private dataItems: DataItem[] = [];
  groupedData: any;
  dropdownsData: DropdownsData = { countries: [], camps: [], schools: [] }
  selectedDropdownsData: SelectedDropdownsData = { country: '', camp: '', school: '' }
  selectedGroupedBySchools$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private api: ApiService, private utils: UtilsService) { }

  /** Sets data items and returns observable of grouped data by countries, camps and schools */
  getData(): Observable<any> {
    return this.api.get(dataURL).pipe(
      map((data: DataItem[]) => {
        this.setDataItems(data);
        this.setGroupedData(data);
        return this.groupedData;
      })
    );
  }

  /** Returns observable of specific data item */
  getById(id: string): Observable<DataItem> {
    // If data items have value, find the specific item from them
    if (this.dataItems && this.dataItems.length) {
      const dataItem: any = this.dataItems.find((item) => item.id == id);
      return of(dataItem);
    }
    // Gets all data items from the server to find the specific item from them
    return this.api.get(dataURL).pipe(
      map((data: DataItem[]) => {
        const dataItem: any = data.find((item) => item.id == id);
        return dataItem;
      })
    );
  }

  setDropdownsData(dropdownsData: DropdownsData) {
    this.dropdownsData = dropdownsData;
  }

  setSelectedDropdownsData(selectedDropdownsData: SelectedDropdownsData) {
    this.selectedDropdownsData = selectedDropdownsData;
  }

  /**
   * Emits selected grouped data items by schools to selectedGroupedBySchools$
   * @param selected Selected data items grouped by schools
   */
  emitSelectedGroupedBySchools(selected: any) {
    this.selectedGroupedBySchools$.next(selected);
  }

  private setDataItems(data: DataItem[]): void {
    this.dataItems = data;
  }

  private setGroupedData(data: DataItem[]) {
    this.groupedData = this.getGroupedData(data);
  }

  private getGroupedData(data: DataItem[]): any {
    // group by countries
    const groupedData: any = this.groupByCountries(data);
    // group by camps per every country
    for (const country in groupedData) {
      groupedData[country] = this.groupByCamps(groupedData[country]);
      // group by schools per every camp
      for (const camp in groupedData[country]) {
        groupedData[country][camp] = this.groupBySchools(groupedData[country][camp]);
      }
    }
    return groupedData;
  }

  private groupByCountries(array: DataItem[]): any {
    const key: string = 'country';
    return this.utils.groupBy(array, key);
  };

  private groupByCamps(array: DataItem[]): any {
    const key: string = 'camp';
    return this.utils.groupBy(array, key);
  };

  private groupBySchools(array: DataItem[]): any {
    const key: string = 'school';
    return this.utils.groupBy(array, key);
  };

}
