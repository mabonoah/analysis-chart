import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataItem } from '../../interfaces/Dashboard';
import { DashboardDataService } from '../../services/dashboard-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  dataItem: DataItem = { id: '', country: '', camp: '', school: '', month: '', lessons: 0 };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DashboardDataService
  ) { }

  ngOnInit(): void {
    this.setDataItem();
  }

  private setDataItem(): void {
    const id: string = this.activatedRoute.snapshot.params['id'];
    this.dataService.getById(id)
      .subscribe((data: DataItem) => this.dataItem = data)
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard'])
  }

}
