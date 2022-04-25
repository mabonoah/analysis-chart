import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveElement, ChartEvent, ChartOptions } from 'chart.js';
import { takeWhile } from 'rxjs';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { ChartDataItem, DataItem } from '../../interfaces/Dashboard';
import { DashboardDataService } from '../../services/dashboard-data.service';

@Component({
  selector: 'dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss']
})
export class DashboardChartComponent implements OnInit, OnDestroy {
  private alive: boolean = true;
  chartData: ChartDataItem[] = [];
  labels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  sharedOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 4,
    elements: {
      point: {
        radius: 5,
      }
    },
    onClick: (e: ChartEvent, elements: ActiveElement[]) => { this.navigateToDetails(elements) },
  }
  whiteThemeOptions: ChartOptions = {
    color: '#666666',
    scales: {
      x: {
        ticks: { color: '#666666' },
        grid: { color: '#c6c7ca' }
      },
      y: {
        ticks: { color: '#666666' },
        grid: { color: '#c6c7ca' }
      }
    },
    ...this.sharedOptions
  };
  darkThemeOptions: ChartOptions = {
    color: 'white',
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    },
    ...this.sharedOptions
  };

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private dataService: DashboardDataService,
    public themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.onUpdateSchools();
  }

  private onUpdateSchools() {
    this.dataService.selectedGroupedBySchools$
      .pipe(takeWhile(() => this.alive))
      .subscribe((groupedData: any) => {
        this.setChartData(groupedData);
      });
  }

  private setChartData(groupedData: any): void {
    this.chartData = [];
    if (!groupedData) return;
    let chartDataItem: ChartDataItem;
    let dataItems: DataItem[] = [];
    for (const school in groupedData) {
      dataItems = groupedData[school];
      chartDataItem = { label: school, data: [], info: dataItems }
      dataItems.map((item: DataItem) => {
        chartDataItem.data.push({ x: item.month, y: item.lessons });
      })
      this.chartData.push(chartDataItem);
    }
  }

  private navigateToDetails(elements: ActiveElement[]): void {
    if (!elements || !elements.length) return;
    const index: number = elements[0].index;
    const datasetIndex: number = elements[0].datasetIndex;
    const dataItemId: string = this.chartData[datasetIndex].info[index].id;
    this.ngZone.run(() => this.router.navigate([`/details/${dataItemId}`]))
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
