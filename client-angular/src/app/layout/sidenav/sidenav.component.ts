import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterModule, CommonModule],
  styleUrls: ["./sidenav.component.css"],
})
export class SidenavComponent {
  navItems: NavItem[] = [
    { label: "Dashboard", icon: "dashboard", route: "/dashboard"},
    { label: "Users", icon: "people", route: "/users" },
    { label: "Matching Data", icon: "settings", route: "/matching-data"},
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  isVisible(item: NavItem): boolean {
    return true
  }
  alwaysVisible(): boolean {
    return true;
  }
  navigateTo(route: string): void {
    console.log('Navigating to:', route);
    this.router.navigate([route]);
  }
}