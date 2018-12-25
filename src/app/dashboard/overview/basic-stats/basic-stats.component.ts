import {Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../../data.service";
import * as Chart from 'chart.js';
import {formatDate} from '@angular/common';
import {formatNumber} from '@angular/common';


@Component({
  selector: 'dash-basic-stats',
  templateUrl: './basic-stats.component.html',
  styleUrls: ['./basic-stats.component.scss']
})
export class BasicStatsComponent implements OnInit {

  @ViewChild('gradeDevelopmentChart') chartRef;

  public allProgress;
  public statsExpanded = false;

  constructor(public dataService: DataService, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    this.allProgress = this.dataService.allProgress;

    this.renderGradeDevelopmentChart();
  }

  renderGradeDevelopmentChart() {
    const data = [];
    let gradeSum = 0;
    for (let course of this.dataService.allCourses) {
      if (course.gradeNum && course.date) {
        data.push({
          id: course.id,
          date: course.date,
          grade: course.gradeNum
        });
      }
    }
    data.sort((a, b) => a.date.localeCompare(b.date));
    data.map((d, i) => {
      gradeSum += d.grade;
      d.average = gradeSum / (i + 1);
      return d;
    });

    new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: data.map(d => formatDate(d.date, 'MM.yy', this.locale)),
        datasets: [
          {
            data: data.map(d => {return {x: d.date, y: d.average}}),
            borderColor: '#e68c74',
            borderWidth: 5,
            backgroundColor: 'rgba(16, 52, 64, 0.4)',
            fill: true
          }
        ]
      },
      options: {
        legend: {
          display: false,
          labels: {
            fontColor: '#fafafa'
          }
        },
        scales: {
          xAxes: [{
            display: true,
            gridLines:{
              color:"rgba(255,255,255,0.2)",
              zeroLineColor:"rgba(255,255,255,0.2)"
            },
            ticks: {
              fontColor: 'white',
              showLabelBackdrop: false
            },
          }],
          yAxes: [{
            display: true,
            gridLines:{
              color:"rgba(255,255,255,0.2)",
              zeroLineColor:"rgba(255,255,255,0.2)"
            },
            ticks: {
              fontColor: 'white',
              showLabelBackdrop: false,
              reverse: true
            },
          }],
        },
        tooltips: {
          custom: function(tooltip) {
            if (!tooltip) return;
            tooltip.displayColors = false;
          },
          callbacks: {
            label: (tooltipItem) => {
              let item = data[tooltipItem.index];
              return [
                `Note: ${formatNumber(item.grade, this.locale, '1.2-2')}`,
                `Gesamtnote: ${formatNumber(item.average, this.locale, '1.2-2')}`,
                `Datum: ${formatDate(item.date, 'dd.MM.yyyy', this.locale)}`
              ]
            },
            title: (tooltipItem) => {
              return data[tooltipItem[0].index].id;
            }
          }
        }
      }
    })
  }

}
