
// import { Component, OnInit } from '@angular/core';
// import { CommonModule, TitleCasePipe } from '@angular/common';

// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatTableModule } from '@angular/material/table';
// import { MatChipsModule } from '@angular/material/chips';
// import { RouterModule } from '@angular/router';
// import { MatButtonModule } from '@angular/material/button';
// import { EchartsComponent } from '../../shared/echarts/echarts.component';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css'],
//   standalone: true,
//   imports: [
//     CommonModule,
//     EchartsComponent,
//     MatCardModule,
//     MatIconModule,
//     MatProgressSpinnerModule,
//     MatTableModule,
//     MatChipsModule,
//     RouterModule,
//     MatButtonModule,
//   ]
// })
// export class DashboardComponent implements OnInit {
//   loading = true;
//   userCount = 0;
//   teacherCount = 0;
//   principalCount = 0;
//   recentUsers: any[] = [];
  
//   // תרשים התפלגות משתמשים
//   userChartOptions = {
//     tooltip: {
//       trigger: 'item',
//       formatter: '{a} <br/>{b}: {c} ({d}%)'
//     },
//     legend: {
//       orient: 'horizontal',
//       bottom: 'bottom',
//       data: ['Teachers', 'Principals', 'Admins']
//     },
//     series: [
//       {
//         name: 'User Distribution',
//         type: 'pie',
//         radius: ['50%', '70%'],
//         avoidLabelOverlap: false,
//         itemStyle: {
//           borderRadius: 10,
//           borderColor: '#fff',
//           borderWidth: 2
//         },
//         label: {
//           show: false,
//           position: 'center'
//         },
//         emphasis: {
//           label: {
//             show: true,
//             fontSize: 20,
//             fontWeight: 'bold'
//           }
//         },
//         labelLine: {
//           show: false
//         },
//         data: [
//           { value: 0, name: 'Teachers', itemStyle: { color: '#4CAF50' } },
//           { value: 0, name: 'Principals', itemStyle: { color: '#2196F3' } },
//           { value: 0, name: 'Admins', itemStyle: { color: '#FF5722' } }
//         ]
//       }
//     ]
//   };

//   // תרשים התאמת מורים
//   matchingChartOptions = {
//     tooltip: {
//       trigger: 'axis',
//       axisPointer: {
//         type: 'shadow'
//       }
//     },
//     grid: {
//       left: '3%',
//       right: '4%',
//       bottom: '3%',
//       containLabel: true
//     },
//     xAxis: [
//       {
//         type: 'category',
//         data: ['High Match', 'Medium Match', 'Low Match'],
//         axisTick: {
//           alignWithLabel: true
//         }
//       }
//     ],
//     yAxis: [
//       {
//         type: 'value',
//         minInterval: 1
//       }
//     ],
//     series: [
//       {
//         name: 'Teacher Matches',
//         type: 'bar',
//         barWidth: '60%',
//         data: [
//           { 
//             value: 0, 
//             itemStyle: { color: '#4CAF50' } 
//           },
//           { 
//             value: 0, 
//             itemStyle: { color: '#FFC107' } 
//           },
//           { 
//             value: 0, 
//             itemStyle: { color: '#F44336' } 
//           }
//         ]
//       }
//     ]
//   };

//   displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

//   constructor() {}

//   ngOnInit(): void {
//     this.loadDashboardData();
//   }

//   loadDashboardData(): void {
//     // סימולציה של טעינת נתונים
//     setTimeout(() => {
//       // עדכון נתוני המשתמשים
//       this.userCount = 26;
//       this.teacherCount = 15;
//       this.principalCount = 8;
      
//       // עדכון נתוני התרשימים
//       this.userChartOptions.series[0].data = [
//         { value: 15, name: 'Teachers', itemStyle: { color: '#4CAF50' } },
//         { value: 8, name: 'Principals', itemStyle: { color: '#2196F3' } },
//         { value: 3, name: 'Admins', itemStyle: { color: '#FF5722' } }
//       ];

//       this.matchingChartOptions.series[0].data = [
//         { value: 7, itemStyle: { color: '#4CAF50' } },
//         { value: 12, itemStyle: { color: '#FFC107' } },
//         { value: 5, itemStyle: { color: '#F44336' } }
//       ];

//       // נתוני משתמשים אחרונים
//       this.recentUsers = [
//         { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', role: 'teacher' },
//         { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', role: 'principal' },
//         { id: 3, firstName: 'Robert', lastName: 'Johnson', email: 'robert.j@example.com', role: 'teacher' },
//         { id: 4, firstName: 'Emily', lastName: 'Williams', email: 'emily.w@example.com', role: 'teacher' },
//         { id: 5, firstName: 'Michael', lastName: 'Brown', email: 'michael.b@example.com', role: 'admin' }
//       ];

//       this.loading = false;
//     }, 1500);
//   }

//   getRoleColor(role: string): string {
//     switch (role) {
//       case 'admin':
//         return 'warn';
//       case 'principal':
//         return 'primary';
//       case 'teacher':
//         return 'accent';
//       default:
//         return '';
//     }
//   }
  
// }// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { EchartsComponent } from '../../shared/echarts/echarts.component';
import { UserService } from '../../services/user.service';
import { User, UserDto } from '../../models/user.model'; // ודא שהמודל קיים

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    EchartsComponent,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatChipsModule,
    RouterModule,
    MatButtonModule
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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserStatistics();
  }

  loadUserStatistics(): void {
    this.loading = true;

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.userCount = users.length;
        this.teacherCount = users.filter(u => u.role === 'teacher').length;
        this.principalCount = users.filter(u => u.role === 'principal').length;
        this.adminCount = users.filter(u => u.role === 'admin').length;
      console.log("countttttt",this.principalCount);

        this.recentUsers = users.slice(0, 5);

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

        // אתה יכול להוסיף כאן את `getOrderDataT()` לטעינת התאמות אם תרצה.
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
              { value: 0, itemStyle: { color: '#4CAF50' } }, // אפשר להחליף לנתונים אמיתיים בהמשך
              { value: 0, itemStyle: { color: '#FFC107' } },
              { value: 0, itemStyle: { color: '#F44336' } }
            ]
          }]
        };

        this.loading = false;
      },
      error: () => {
        this.loading = false;
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
