import { Component, type OnInit, ViewChild } from "@angular/core"
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator"
import { MatSort, MatSortModule } from "@angular/material/sort"
import { MatTableDataSource, MatTableModule } from "@angular/material/table"
import type { User } from "../../models/user.model"
import  { UserService } from "../../services/user.service"
import  { AuthService } from "../../services/auth.service"
import  { MatDialog } from "@angular/material/dialog"
import  { MatSnackBar } from "@angular/material/snack-bar"
import { TitleCasePipe } from "@angular/common"
import { MatButtonModule } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { MatChipsModule } from "@angular/material/chips"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { RouterModule } from "@angular/router"

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
  standalone: true,
  imports: [
    RouterModule,
    TitleCasePipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ]
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "email", "phoneNumber", "role", "residentialArea", "actions"]
  dataSource = new MatTableDataSource<User>([])
  loading = true
  isAdmin = false

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.hasRole(["admin"])
    this.loadUsers()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  loadUsers(): void {
    this.loading = true
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.dataSource.data = users
        this.loading = false
      },
      error: (error) => {
        this.snackBar.open("Failed to load users", "Close", { duration: 3000 })
        this.loading = false
      },
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  deleteUser(id: number): void {
    if (confirm("Are you sure you want to delete this user?")) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers()
        },
        error: (error) => {
          this.snackBar.open("Failed to delete user", "Close", { duration: 3000 })
        },
      })
    }
  }
}
