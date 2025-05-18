import { Component, type OnInit, ViewChild } from "@angular/core"
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator"
import { MatSort, MatSortModule } from "@angular/material/sort"
import { MatTableDataSource, MatTableModule } from "@angular/material/table"
import type { SortedTeacher } from "../../models/matching-data.model"
import  { MatchingService } from "../../services/matching.service"
import  { AuthService } from "../../services/auth.service"
import  { MatSnackBar } from "@angular/material/snack-bar"
import type { User } from "../../models/user.model"
import { NgClass } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { RouterModule } from "@angular/router"

@Component({
  selector: "app-teacher-sorting",
  templateUrl: "./teacher-sorting.component.html",
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgClass
  ],
  styleUrls: ["./teacher-sorting.component.css"],
})
export class TeacherSortingComponent implements OnInit {
  displayedColumns: string[] = ["name", "email", "phoneNumber", "residentialArea", "matchScore", "actions"]
  dataSource = new MatTableDataSource<SortedTeacher>([])
  loading = true
  currentUser: User | null = null

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private matchingService: MatchingService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue
    this.loadSortedTeachers()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  loadSortedTeachers(): void {
    if (!this.currentUser || !this.currentUser.id) {
      this.snackBar.open("User information not available", "Close", { duration: 3000 })
      this.loading = false
      return
    }

    this.loading = true
    this.matchingService.getSortedTeachers(this.currentUser.id).subscribe({
      next: (teachers) => {
        this.dataSource.data = teachers
        this.loading = false
      },
      error: (error) => {
        this.snackBar.open("Failed to load sorted teachers", "Close", { duration: 3000 })
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

  getMatchScoreClass(score: number): string {
    if (score > 70) {
      return "high-match"
    } else if (score > 40) {
      return "medium-match"
    } else {
      return "low-match"
    }
  }
}
