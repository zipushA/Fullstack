import { Injectable } from "@angular/core"
import { HttpClient, HttpParams } from "@angular/common/http"
import { Observable } from "rxjs"
import type { User, UserDto } from "../models/user.model"
import { catchError, tap } from "rxjs/operators"
import { MatSnackBar } from "@angular/material/snack-bar"
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/User`, {
      responseType: 'json' as 'json' // הגדרה מפורשת של סוג התגובה
    });
  }

  // אפשרות 1: שימוש בבקשת POST במקום GET
  getUsersWithData(role: string): Observable<UserDto[]> {
    return this.http.post<UserDto[]>(`${environment.apiUrl}/User/Full`, { role });
  }

  // אפשרות 2: העברת הפרמטר כחלק מה-URL
  getUsersWithDataAlt(role: string): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${environment.apiUrl}/User/Full/${role}`, {
      responseType: 'json' as 'json'
    });
  }

  // אפשרות 3: העברת הפרמטר כפרמטר query
  getUsersWithDataQuery(role: string): Observable<UserDto[]> {
    const params = new HttpParams().set('role', role);
    return this.http.get<UserDto[]>(`${environment.apiUrl}/User/Full`, {
      params,
      responseType: 'json' as 'json'
    });
  }

  getUserById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${environment.apiUrl}/User/Full/${id}`, {
      responseType: 'json' as 'json'
    });
  }

  getOrderData(id: number): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${environment.apiUrl}/User/OrderData?id=${id}`, {
      responseType: 'json' as 'json'
    });
  }

  getOrderDataT(id: number): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${environment.apiUrl}/User/OrderDataT?id=${id}`, {
      responseType: 'json' as 'json'
    });
  }

  createUser(user: User, role: string): Observable<UserDto> {
    return this.http.post<UserDto>(`${environment.apiUrl}/User/${role}`, user).pipe(
      tap(() => this.snackBar.open("User created successfully", "Close", { duration: 3000 })),
      catchError((error) => {
        this.snackBar.open(error.error || "Failed to create user", "Close", { duration: 3000 })
        throw error
      }),
    )
  }

  updateUser(id: number, user: User): Observable<UserDto> {
    return this.http.put<UserDto>(`${environment.apiUrl}/User/${id}`, user).pipe(
      tap(() => this.snackBar.open("User updated successfully", "Close", { duration: 3000 })),
      catchError((error) => {
        this.snackBar.open(error.error || "Failed to update user", "Close", { duration: 3000 })
        throw error
      }),
    )
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/User/${id}`).pipe(
      tap(() => this.snackBar.open("User deleted successfully", "Close", { duration: 3000 })),
      catchError((error) => {
        this.snackBar.open(error.error || "Failed to delete user", "Close", { duration: 3000 })
        throw error
      }),
    )
  }
}