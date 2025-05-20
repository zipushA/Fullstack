
// import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
// import { User } from '../../models/user.model';
// import { UserService } from '../../services/user.service';
// import { AuthService } from '../../services/auth.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatSortModule } from '@angular/material/sort';
// import { MatTableModule } from '@angular/material/table';
// import { RouterModule } from '@angular/router';
// import { TitleCasePipe } from '@angular/common';

// @Component({
//   selector: 'app-user-list',
//   templateUrl: './user-list.component.html',
//   standalone: true,
//   imports: [
//     RouterModule,
//     MatButtonModule,
//     MatCardModule,
//     MatChipsModule,
//     MatFormFieldModule,
//     MatIconModule,
//     MatInputModule,
//     MatPaginatorModule,
//     MatProgressSpinnerModule,
//     MatSortModule,
//     MatTableModule,
//     TitleCasePipe
//   ],
//   styleUrls: ['./user-list.component.css']
// })
// export class UserListComponent implements OnInit, AfterViewInit {
//   displayedColumns: string[] = ['id', 'name', 'email', 'role', 'residentialArea', 'actions'];
//   dataSource = new MatTableDataSource<User>([]);
//   loading = true;
//   isAdmin = false;

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   constructor(
//     private userService: UserService,
//     private authService: AuthService,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit(): void {
//     console.log('UserListComponent initialized');
//     this.isAdmin = this.authService.hasRole(['admin']);
//     this.loadUsers();
//   }

//   ngAfterViewInit(): void {
//     if (this.paginator && this.sort) {
//       this.dataSource.paginator = this.paginator;
//       this.dataSource.sort = this.sort;
//     }
//   }

//   loadUsers(): void {
//     console.log('Loading users...');
//     this.loading = true;
    
//     // אם אין נתונים מהשרת, נשתמש בנתונים מדומים לבדיקה
//     const mockUsers: User[] = [
//       { id: 1, name: 'ישראל',  email: 'israel@example.com',role: 'admin' },
//       { id: 2, name: 'משה', email: 'moshe@example.com', role: 'teacher' },
//       { id: 3, name: 'שרה', email: 'sara@example.com', role: 'principal' },
//       { id: 4, name: 'דוד', email: 'david@example.com', role: 'teacher', },
//       { id: 5, name: 'רחל', email: 'rachel@example.com', role: 'teacher' }
//     ];

//     this.userService.getUsers().subscribe({
//       next: (users) => {
//         console.log('Users loaded:', users);
//         // אם יש נתונים מהשרת, נשתמש בהם
//         if (users && users.length > 0) {
//           this.dataSource.data = users;
//         } else {
//           // אחרת נשתמש בנתונים מדומים
//           console.log('Using mock data');
//           this.dataSource.data = mockUsers;
//         }
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Error loading users:', error);
//         this.snackBar.open('Failed to load users, using mock data', 'Close', { duration: 3000 });
//         // במקרה של שגיאה, נשתמש בנתונים מדומים
//         this.dataSource.data = mockUsers;
//         this.loading = false;
//       }
//     });
//   }

//   applyFilter(event: Event): void {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();

//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }

//   deleteUser(id: number): void {
//     if (confirm('Are you sure you want to delete this user?')) {
//       this.userService.deleteUser(id).subscribe({
//         next: () => {
//           this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
//           this.loadUsers();
//         },
//         error: (error) => {
//           console.error('Error deleting user:', error);
//           this.snackBar.open('Failed to delete user', 'Close', { duration: 3000 });
//         }
//       });
//     }
//   }
// }
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    TitleCasePipe
  ],
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'residentialArea', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  loading = true;
  isAdmin = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.hasRole(['admin']);
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.dataSource.data = users ?? []; // גם אם null או undefined
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('שגיאה בטעינת המשתמשים', 'סגור', { duration: 3000 });
        this.dataSource.data = [];
        this.loading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: number): void {
    if (confirm('האם את/ה בטוח/ה שברצונך למחוק את המשתמש?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.snackBar.open('המשתמש נמחק בהצלחה', 'סגור', { duration: 3000 });
          this.loadUsers();
        },
        error: () => {
          this.snackBar.open('שגיאה במחיקת המשתמש', 'סגור', { duration: 3000 });
        }
      });
    }
  }
}
