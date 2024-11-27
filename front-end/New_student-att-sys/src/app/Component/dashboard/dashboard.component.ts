import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { PieChartComponent } from '../pie-chart/pie-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,HighchartsChartModule,PieChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'spline',
    },
    title: {
      text: 'Batches wise Students',
    },
    xAxis: {
      categories: [
        
        'Batch 1',
        'Batch 2',
        'Batch 3',
        'Batch 4',
        'Batch 5',
        'batch 6',

      ],
    },
    yAxis: {
      title: {
        text: 'Students',
      },
    },
    series: [
      {
        name: 'Batches',
      data: [
        5,
        25,
        30,
        10,
        45,
        30
        ],
      type:'spline',
      }]

  };

  
 }
