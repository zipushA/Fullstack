import { Component, Input, OnChanges, SimpleChanges, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.css'],
  standalone: true,
  imports: []
})
export class EchartsComponent implements OnChanges, AfterViewInit {
  @Input() options: any;
  @Input() theme?: string;
  @Input() loading = false;
  @Input() height = '300px';

  private chart: echarts.ECharts | null = null;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && this.options && this.chart) {
      this.updateChart();
    }
    
    if (changes['loading'] && this.chart) {
      this.toggleLoading();
    }
  }

  private initChart(): void {
    const container = this.el.nativeElement.querySelector('.chart-container');
    if (!container) return;
    
    this.chart = echarts.init(container, this.theme);
    
    if (this.options) {
      this.chart.setOption(this.options);
    }
    
    this.toggleLoading();
    
    // התאמת גודל התרשים כאשר החלון משתנה
    window.addEventListener('resize', () => {
      if (this.chart) {
        this.chart.resize();
      }
    });
  }

  private updateChart(): void {
    if (this.chart) {
      this.chart.setOption(this.options, true);
    }
  }

  private toggleLoading(): void {
    if (!this.chart) return;
    
    if (this.loading) {
      this.chart.showLoading();
    } else {
      this.chart.hideLoading();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  }
}