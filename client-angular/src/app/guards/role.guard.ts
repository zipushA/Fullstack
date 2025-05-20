import { Injectable } from "@angular/core"
import  { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router"
import { AuthService } from "../services/auth.service"


@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  const roles = route.data["roles"] as string[];
  const userRole = this.authService.getRoleFromToken();

  if (userRole && roles.includes(userRole.toLowerCase())) {
    return true;
  }

  this.router.navigate(["/access-denied"]);
  return false;
}


}
