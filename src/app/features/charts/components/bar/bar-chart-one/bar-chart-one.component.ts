import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-bar-chart-one',
  imports: [
    ChartModule
  ],
  templateUrl: './bar-chart-one.component.html',
  styles: ``
})
export class BarChartOneComponent implements OnInit {

  data: ChartData<'bar'> | undefined;
  options: ChartOptions<'bar'> | undefined;

  ngOnInit() {
    this.data = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [
        {
          label: 'Ventas',
          backgroundColor: '#465fff',
          borderRadius: 5,
          data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112],
          barThickness: 20
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'start',
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            boxHeight: 8,
            color: '#6B7280',
            font: {
              family: 'Inter',
              size: 12
            }
          }
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
