import type { Routes } from "@angular/router"
import { LoginComponent } from "./auth/login/login.component"


import { MatchingDataComponent } from "./matching/matching-data/matching-data.component"
import { TeacherSortingComponent } from "./matching/teacher-sorting/teacher-sorting.component"
import { AuthGuard } from "./guards/auth.guard"
import { RoleGuard } from "./guards/role.guard"
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component"
import { UserDetailComponent } from "./users/user-detail/user-detail.component"
import { UserFormComponent } from "./users/user-form/user-form.component"
import { UserListComponent } from "./users/user-list/user-list.component"

export const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "users",
    component: UserListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["admin", "principal"] },
  },
  {
    path: "users/:id",
    component: UserDetailComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["admin", "principal"] },
  },
  {
    path: "users/edit/:id",
    component: UserFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["admin"] },
  },
  {
    path: "users/create",
    component: UserFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["admin"] },
  },
  {
    path: "matching-data",
    component: MatchingDataComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["admin"] },
  },
  {
    path: "teacher-sorting",
    component: TeacherSortingComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["principal"] },
  },
  { path: "**", redirectTo: "/dashboard" },
]
