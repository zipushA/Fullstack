import { Component, type OnInit } from "@angular/core"
import  { ActivatedRoute, Router, RouterModule } from "@angular/router"
import  { UserService } from "../../services/user.service"
import  { AuthService } from "../../services/auth.service"
import type { UserDto } from "../../models/user.model"
import  { MatSnackBar } from "@angular/material/snack-bar"
import { JsonPipe, TitleCasePipe } from "@angular/common"
import { MatButtonModule } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { MatChipsModule } from "@angular/material/chips"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  standalone: true,
  imports: [
    RouterModule,
    TitleCasePipe,
    JsonPipe,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  styleUrls: ["./user-detail.component.css"],
})
export class UserDetailComponent implements OnInit {
  userId!: number
  user: UserDto | null = null
  loading = true
  isAdmin = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.hasRole(["admin"])
    this.userId = +this.route.snapshot.params["id"]
    this.loadUser()
  }

  loadUser(): void {
    this.loading = true
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.user = user
        this.loading = false
      },
      error: (error) => {
        this.snackBar.open("Failed to load user details", "Close", { duration: 3000 })
        this.loading = false
        this.router.navigate(["/users"])
      },
    })
  }

  deleteUser(): void {
    if (confirm("Are you sure you want to delete this user?")) {
      this.userService.deleteUser(this.userId).subscribe({
        next: () => {
          this.snackBar.open("User deleted successfully", "Close", { duration: 3000 })
          this.router.navigate(["/users"])
        },
        error: (error) => {
          this.snackBar.open("Failed to delete user", "Close", { duration: 3000 })
        },
      })
    }
  }
}
