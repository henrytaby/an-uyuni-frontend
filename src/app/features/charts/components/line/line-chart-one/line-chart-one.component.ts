import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-line-chart-one',
  imports: [
    ChartModule
  ],
  templateUrl: './line-chart-one.component.html',
  styles: ``
})
export class LineChartOneComponent implements OnInit {

  data: ChartData<'line'> | undefined;
  options: ChartOptions<'line'> | undefined;

  ngOnInit() {
    this.data = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [
        {
          label: 'Ventas',
          data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235],
          fill: true,
          borderColor: '#465FFF',
          backgroundColor: 'rgba(70, 95, 255, 0.2)',
          tension: 0,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 6
        },
        {
          label: 'Ingresos',
          data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
          fill: true,
          borderColor: '#9CB9FF',
          backgroundColor: 'rgba(156, 185, 255, 0.2)',
          tension: 0,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 6
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawOnChartArea: false
          },
          ticks: {
            color: '#6B7280',
            font: {
              family: 'Inter',
              size: 12
            }
          }
        },
        y: {
          grid: {
            display: true,
            color: 'rgba(107, 114, 128, 0.1)',
            drawOnChartArea: true
          },
          ticks: {
            color: '#6B7280',
            font: {
              family: 'Inter',
              size: 12
            }
          }
        }
      }
    };
  }
}
