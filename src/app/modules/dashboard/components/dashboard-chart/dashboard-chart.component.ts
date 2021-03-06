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
  chartTitle: string = '';
  chartData: ChartDataItem[] = [];
  labels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  private _aspectRatio: number;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private dataService: DashboardDataService,
    public themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.onResizeWindow();
    this.setAspectRatio();
    this.onUpdateSchools();
  }

  get whiteThemeOptions(): ChartOptions {
    return {
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
    }
  };

  get darkThemeOptions(): ChartOptions {
    return {
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
    }
  };

  private get sharedOptions(): ChartOptions {
    return {
      responsive: true,
      aspectRatio: this.aspectRatio,
      elements: {
        point: {
          radius: 5
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: () => '',
            label: (tooltipItem) => this.getTooltipLabel(tooltipItem),
            footer: (tooltipItems) => this.getTooltipFooter(tooltipItems)
          }
        }
      },
      onClick: (e: ChartEvent, elements: ActiveElement[]) => { this.navigateToDetails(elements) },
    }
  }

  private get aspectRatio(): number {
    return this._aspectRatio;
  }

  private set aspectRatio(value: number) {
    this._aspectRatio = value;
  }

  private onResizeWindow(): void {
    window.onresize = () => this.setAspectRatio();
  }

  private setAspectRatio(): void {
    const screenWidth: number = window.screen.width;
    const maxSmallDevice: number = 767.98;
    if (screenWidth > maxSmallDevice) this.aspectRatio = 3.3;
    else this.aspectRatio = 1.6;
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
      chartDataItem = { label: '', totalLessons: 0, data: [], info: dataItems }
      dataItems.map((item: DataItem) => {
        chartDataItem.totalLessons += item.lessons;
        chartDataItem.data.push({ x: item.month, y: item.lessons });
      })
      chartDataItem.label = `${chartDataItem.totalLessons} lessons in ${school}`;
      this.chartData.push(chartDataItem);
    }
    this.setChartTitle();
  }

  private setChartTitle(): void {
    let totalCampLessons: number = 0;
    this.chartData.map((item: ChartDataItem) => {
      totalCampLessons += item.totalLessons;
    })
    const camp: string = this.chartData[0].info[0].camp;
    this.chartTitle = `${totalCampLessons} lessons in ${camp}`;
  }

  private getTooltipLabel(tooltipItem: any) {
    const datasetIndex: number = tooltipItem.datasetIndex;
    const school: string = this.chartData[datasetIndex].info[0].school;
    return school;
  }

  private getTooltipFooter(tooltipItems: any[]) {
    const index: number = tooltipItems[0].dataIndex;
    const datasetIndex: number = tooltipItems[0].datasetIndex;
    const totalLessons: number = tooltipItems[0].dataset.totalLessons;
    const lessons: number = this.chartData[datasetIndex].info[index].lessons;
    const percentage = Math.round(lessons / totalLessons * 100);
    return `${lessons} lessons | ${percentage}%`;
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
