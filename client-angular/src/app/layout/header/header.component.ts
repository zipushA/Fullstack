import { Component, EventEmitter, Output } from "@angular/core"
import  { AuthService } from "../../services/auth.service"
import  { User } from "../../models/user.model"
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  standalone: true,
  imports:[MatToolbarModule,RouterModule,MatMenuModule,MatIconModule,MatMenuModule,MatButtonModule],
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>()

  constructor(public authService: AuthService) {}

  get currentUser(): User | null {
    return this.authService.currentUserValue
  }

  logout(): void {
    this.authService.logout()
  }
}
