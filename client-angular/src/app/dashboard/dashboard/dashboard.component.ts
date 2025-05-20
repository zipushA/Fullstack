
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { EchartsComponent } from '../../shared/echarts/echarts.component';
import { UserService } from '../../services/user.service';
import { MatchingService } from '../../services/matching.service';
import { User } from '../../models/user.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    EchartsComponent,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatChipsModule,
    RouterModule,
    MatButtonModule,
  TitleCasePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = true;
  teacherCount = 0;
  principalCount = 0;
  adminCount = 0;
  userCount = 0;
  recentUsers: User[] = [];

  userChartOptions: any;
  matchingChartOptions: any;
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

  constructor(
    private userService: UserService,
    private matchingService: MatchingService
  ) {}

  ngOnInit(): void {
    this.loadUserStatistics();
  }

  loadUserStatistics(): void {
    this.loading = true;
this.userService.getUsers().subscribe({
      next: (users) => {
        this.userCount = users.length;
        this.recentUsers = users.slice(0, 5);

        // קריאות נפרדות למניין תפקידים
        this.userService.getTeacherCount().subscribe({
          next: (count) => this.teacherCount = count,
          error: () => this.teacherCount = 0
        });

        this.userService.getPrincipalCount().subscribe({
          next: (count) => this.principalCount = count,
          error: () => this.principalCount = 0
        });

        // נבנה את תרשים החלוקה
        this.userChartOptions = {
          tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
          legend: {
            orient: 'horizontal',
            bottom: 'bottom',
            data: ['Teachers', 'Principals', 'Admins']
          },
          series: [{
            name: 'User Distribution',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
            label: { show: false, position: 'center' },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            labelLine: { show: false },
            data: [
              { value: this.teacherCount, name: 'Teachers', itemStyle: { color: '#4CAF50' } },
              { value: this.principalCount, name: 'Principals', itemStyle: { color: '#2196F3' } },
              { value: this.adminCount, name: 'Admins', itemStyle: { color: '#FF5722' } }
            ]
          }]
        };

       this.loadMatchingStatistics();
      },
      error: () => {
        this.loading = false;
        console.error('שגיאה בטעינת משתמשים');
      }
    });
  }

  loadMatchingStatistics(): void {
    this.matchingService.getMatchingData().subscribe({
      next: (data) => {
        const high = data.filter(d => d.seniority >= 80).length;
        const medium = data.filter(d => d.seniority >= 50 && d.seniority < 80).length;
        const low = data.filter(d => d.seniority < 50).length;

        this.matchingChartOptions = {
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
          xAxis: [{ type: 'category', data: ['High Match', 'Medium Match', 'Low Match'] }],
          yAxis: [{ type: 'value', minInterval: 1 }],
          series: [{
            name: 'Teacher Matches',
            type: 'bar',
            barWidth: '60%',
            data: [
              { value: high, itemStyle: { color: '#4CAF50' } },
              { value: medium, itemStyle: { color: '#FFC107' } },
              { value: low, itemStyle: { color: '#F44336' } }
            ]
          }]
        };

        this.loading = false;
      },
      error: () => {
        this.loading = false;
        console.error('שגיאה בטעינת נתוני התאמה');
      }
    });
  }

  getRoleColor(role: string): string {
    switch (role) {
      case 'admin': return 'warn';
      case 'principal': return 'primary';
      case 'teacher': return 'accent';
      default: return '';
    }
  }
}
