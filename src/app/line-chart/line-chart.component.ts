import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexMarkers
} from "ng-apexcharts";
import { ChartService } from '../services/chart.service';

export interface  ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: any;

  chartResult: any;

  constructor(private chartService: ChartService) {
    
  }

  ngOnInit(): void {
    this.chartService.getReports().subscribe((res: any) => {
      console.log(res);
      this.chartResult = res.result

      this.drawChart(this.chartResult)
    })
  }

  drawChart(result: any) {
    const labels = result.map((res:any) => res.label)
    const revenue = result.map((res:any) => res.revenue)
    this.chartOptions = {
      series: [
        {
          name: "Desktops",
          data: revenue
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true,
          type: 'x',  
          autoScaleYaxis: false,  
          zoomedArea: {
            fill: {
              color: '#90CAF9',
              opacity: 0.4
            },
            stroke: {
              color: '#0D47A1',
              opacity: 0.4,
              width: 1
            }
          }
        }
      },
      colors: ["#6365EF"],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Product Trends by Month",
        align: "left"
      },
      grid: {
        xaxis: {
          lines: {
              show: false
          }
      },   
      yaxis: {
          lines: {
              show: false
          }
      }
      },
      markers: {
        size: 6,
        strokeColors: "#6365EF"
      },
      xaxis: {
        categories: labels
      },
    };
  }
}
