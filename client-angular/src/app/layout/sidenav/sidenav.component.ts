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
  roles: string[];
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
    { label: "Dashboard", icon: "dashboard", route: "/dashboard", roles: ["admin", "principal", "teacher"] },
    { label: "Users", icon: "people", route: "/users", roles: ["admin", "principal"] },
    { label: "Teacher Sorting", icon: "sort", route: "/teacher-sorting", roles: ["principal"] },
    { label: "Matching Data", icon: "settings", route: "/matching-data", roles: ["admin"] },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  isVisible(item: NavItem): boolean {
    const hasRole = this.authService.hasRole(item.roles);
    return hasRole;
  }
  alwaysVisible(): boolean {
    return true;
  }
  navigateTo(route: string): void {
    console.log('Navigating to:', route);
    this.router.navigate([route]);
  }
}