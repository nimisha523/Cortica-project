import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

interface CourseData {
  name: string;
  y: number;
}


@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [RouterOutlet,HighchartsChartModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {

  highcharts = Highcharts;
  chartOptions: Highcharts.Options = {

    chart: {
      type: 'pie'
    },
    title: {
      text: 'Students by Course'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [
 {
      name: 'Students',
      type: 'pie',
      
      data: [ { name: 'Course A', y: 25 },
        { name: 'Course B', y: 35 },
        { name: 'Course C', y: 20 },
        { name: 'Course D', y: 15 }] as CourseData[
       
      ]

    }]
  };
  

}
