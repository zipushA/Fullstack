import { Component, type OnInit, ViewChild } from "@angular/core"
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator"
import { MatSort, MatSortModule } from "@angular/material/sort"
import { MatTableDataSource, MatTableModule } from "@angular/material/table"
import  { MatchingData } from "../../models/matching-data.model"
import  { MatchingService } from "../../services/matching.service"
import  { MatDialog } from "@angular/material/dialog"
import  { MatSnackBar } from "@angular/material/snack-bar"
import {  FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { MatButtonModule } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"


@Component({
  selector: "app-matching-data",
  templateUrl: "./matching-data.component.html",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  styleUrls: ["./matching-data.component.css"],
})
export class MatchingDataComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "description", "value", "actions"]
  dataSource = new MatTableDataSource<MatchingData>([])
  loading = true
  matchingDataForm!: FormGroup
  isEditMode = false
  currentId: number | null = null

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private matchingService: MatchingService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initForm()
    this.loadMatchingData()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  initForm(): void {
    this.matchingDataForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      value: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    })
  }

  loadMatchingData(): void {
    this.loading = true
    this.matchingService.getMatchingData().subscribe({
      next: (data) => {
        this.dataSource.data = data
        this.loading = false
      },
      error: (error) => {
        this.snackBar.open("Failed to load matching data", "Close", { duration: 3000 })
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

  onSubmit(): void {
    if (this.matchingDataForm.invalid) {
      return
    }

    const matchingData: MatchingData = {
      id: this.currentId || 0,
      name: this.matchingDataForm.value.name,
      description: this.matchingDataForm.value.description,
      value: this.matchingDataForm.value.value,
    }

    if (this.isEditMode && this.currentId) {
      this.matchingService.updateMatchingData(this.currentId, matchingData).subscribe({
        next: () => {
          this.loadMatchingData()
          this.resetForm()
          this.snackBar.open("Matching data updated successfully", "Close", { duration: 3000 })
        },
        error: (error) => {
          this.snackBar.open("Failed to update matching data", "Close", { duration: 3000 })
        },
      })
    } else {
      this.matchingService.createMatchingData(matchingData).subscribe({
        next: () => {
          this.loadMatchingData()
          this.resetForm()
          this.snackBar.open("Matching data created successfully", "Close", { duration: 3000 })
        },
        error: (error) => {
          this.snackBar.open("Failed to create matching data", "Close", { duration: 3000 })
        },
      })
    }
  }

  editMatchingData(data: MatchingData): void {
    this.isEditMode = true
    this.currentId = data.id
    this.matchingDataForm.patchValue({
      name: data.name,
      description: data.description,
      value: data.value,
    })
  }

  deleteMatchingData(id: number): void {
    if (confirm("Are you sure you want to delete this matching data?")) {
      this.matchingService.deleteMatchingData(id).subscribe({
        next: () => {
          this.loadMatchingData()
          this.snackBar.open("Matching data deleted successfully", "Close", { duration: 3000 })
        },
        error: (error) => {
          this.snackBar.open("Failed to delete matching data", "Close", { duration: 3000 })
        },
      })
    }
  }

  resetForm(): void {
    this.isEditMode = false
    this.currentId = null
    this.matchingDataForm.reset({
      name: "",
      description: "",
      value: 0,
    })
  }
}
