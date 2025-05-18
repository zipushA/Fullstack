import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import { BehaviorSubject, type Observable } from "rxjs"
import { tap, catchError } from "rxjs/operators"
import  { Router } from "@angular/router"
import type { LoginModel, LoginResponseDto, RegisterModel, User } from "../models/user.model"

import  { MatSnackBar } from "@angular/material/snack-bar"
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>
  public currentUser: Observable<User | null>
  private tokenExpirationTimer: any
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    const storedUser = localStorage.getItem("currentUser")
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null)
    this.currentUser = this.currentUserSubject.asObservable()

    if (this.isLoggedIn()) {
      this.autoLogout()
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value
  }

  login(loginModel: LoginModel): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${environment.apiUrl}/Auth/login`, loginModel).pipe(
      tap((response) => {
        this.setSession(response)
        this.snackBar.open("Login successful", "Close", { duration: 3000 })
      }),
      catchError((error) => {
        this.snackBar.open(error.error || "Login failed", "Close", { duration: 3000 })
        throw error
      }),
    )
  }
  logout(): void {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("token")
    localStorage.removeItem("tokenExpiration")
    this.currentUserSubject.next(null)
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
    this.router.navigate(["/login"])
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem("token")
    const expiration = localStorage.getItem("tokenExpiration")
    if (!token || !expiration) {
      return false
    }
    return new Date().getTime() < new Date(expiration).getTime()
  }

  hasRole(roles: string[]): boolean {
    const user = this.currentUserValue
    if (!user || !user.role) {
      return false
    }
    return roles.includes(user.role)
  }

  private setSession(authResult: LoginResponseDto): void {
    // Assuming token expiration is 24 hours from now
    const expirationDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

    localStorage.setItem("token", authResult.token)
    localStorage.setItem("currentUser", JSON.stringify(authResult.user))
    localStorage.setItem("tokenExpiration", expirationDate.toISOString())

    this.currentUserSubject.next(authResult.user)
    this.autoLogout()
  }

  private autoLogout(): void {
    const expiration = localStorage.getItem("tokenExpiration")
    if (!expiration) {
      return
    }

    const expirationDate = new Date(expiration)
    const expiresIn = expirationDate.getTime() - new Date().getTime()

    if (expiresIn <= 0) {
      this.logout()
      return
    }

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expiresIn)
  }
}
