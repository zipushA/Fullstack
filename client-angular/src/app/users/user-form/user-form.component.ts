import { Component, type OnInit } from "@angular/core"
import {  FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import  { ActivatedRoute, Router, RouterModule } from "@angular/router"
import  { UserService } from "../../services/user.service"
import  { MatSnackBar } from "@angular/material/snack-bar"
import type { User } from "../../models/user.model"
import { TitleCasePipe } from "@angular/common"
import { MatButtonModule } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSelectModule } from '@angular/material/select'; // ✅ נוספה
import { MatOptionModule } from '@angular/material/core';  
@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    TitleCasePipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ]
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup
  userId: number | null = null
  isEditMode = false
  loading = false
  roles = ["admin", "principal", "teacher"]

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.initForm()

    const id = this.route.snapshot.params["id"]
    if (id) {
      this.userId = +id
      this.isEditMode = true
      this.loadUser()
    }
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]],
      phoneNumber: ["", [Validators.required, Validators.pattern(/^\d{10}$/)]],
      residentialArea: ["", Validators.required],
      role: ["teacher", Validators.required],
    })

    if (this.isEditMode) {
      this.userForm.get("password")?.setValidators([])
      this.userForm.get("password")?.updateValueAndValidity()
    }
  }

  loadUser(): void {
    if (!this.userId) return

    this.loading = true
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          residentialArea: user.residentialArea,
          role: user.role,
        })
        this.loading = false
      },
      error: (error) => {
        this.snackBar.open("Failed to load user data", "Close", { duration: 3000 })
        this.loading = false
        this.router.navigate(["/users"])
      },
    })
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return
    }

    this.loading = true
    const userData: User = {
      id: this.userId || 0,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      phoneNumber: this.userForm.value.phoneNumber,
      residentialArea: this.userForm.value.residentialArea,
      role: this.userForm.value.role,
    }

    if (this.userForm.value.password) {
      ;(userData as any).password = this.userForm.value.password
    }

    if (this.isEditMode && this.userId) {
      this.userService.updateUser(this.userId, userData).subscribe({
        next: () => {
          this.snackBar.open("User updated successfully", "Close", { duration: 3000 })
          this.router.navigate(["/users", this.userId])
          this.loading = false
        },
        error: (error) => {
          this.snackBar.open("Failed to update user", "Close", { duration: 3000 })
          this.loading = false
        },
      })
    } else {
      this.userService.createUser(userData, userData.role || "teacher").subscribe({
        next: (response) => {
          this.snackBar.open("User created successfully", "Close", { duration: 3000 })
          this.router.navigate(["/users", response.data.id])
          this.loading = false
        },
        error: (error) => {
          this.snackBar.open("Failed to create user", "Close", { duration: 3000 })
          this.loading = false
        },
      })
    }
  }
}
