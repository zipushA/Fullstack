import type { Routes } from "@angular/router"
import { LoginComponent } from "./auth/login/login.component"
import { MatchingDataComponent } from "./matching/matching-data/matching-data.component"
import { AuthGuard } from "./guards/auth.guard"
import { RoleGuard } from "./guards/role.guard"
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component"
import { UserDetailComponent } from "./users/user-detail/user-detail.component"
import { UserListComponent } from "./users/user-list/user-list.component"
import { AccessDeniedComponent } from "./AccessDeniedComponent"
 // או איפה שתשימי אותו

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "access-denied", component: AccessDeniedComponent },
  {
    path: "",
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["admin"] },
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      { path: "users", component: UserListComponent },
      { path: "users/:id", component: UserDetailComponent },
      { path: "matching-data", component: MatchingDataComponent },
    ]
  },
  { path: "**", redirectTo: "login" }
];

