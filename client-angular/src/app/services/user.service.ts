import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap, retry } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "../../environments/environment";
import { User, UserDto } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {}

  private handleError(error: HttpErrorResponse, operation = 'operation') {
    console.error(`${operation} failed:`, error);
    const errorMessage = error.error?.message || error.message || `Error in ${operation}`;
    this.snackBar.open(errorMessage, 'סגור', { duration: 5000 });
    return throwError(() => new Error(errorMessage));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/User`).pipe(
      retry(1),
      tap(users => console.log(`Fetched ${users.length} users`)),
      catchError(error => this.handleError(error, 'getUsers'))
    );
  }

  getUsersWithData(role: string): Observable<UserDto[]> {
    const params = new HttpParams().set('role', role);
    return this.http.get<UserDto[]>(`${environment.apiUrl}/User/Full`, { params }).pipe(
      retry(1),
      tap(users => console.log(`Fetched ${users.length} users with role: ${role}`)),
      catchError(error => this.handleError(error, `getUsersWithData(${role})`))
    );
  }

  getUserById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${environment.apiUrl}/User/Full/${id}`).pipe(
      retry(1),
      tap(user => console.log(`Fetched user: ${user.name}`)),
      catchError(error => this.handleError(error, `getUserById(${id})`))
    );
  }

  getOrderData(id: number): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${environment.apiUrl}/User/OrderData?id=${id}`).pipe(
      retry(1),
      tap(data => console.log(`Fetched ${data.length} order items`)),
      catchError(error => this.handleError(error, `getOrderData(${id})`))
    );
  }

  getOrderDataT(id: number): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${environment.apiUrl}/User/OrderDataT?id=${id}`).pipe(
      retry(1),
      tap(data => console.log(`Fetched ${data.length} teacher order items`)),
      catchError(error => this.handleError(error, `getOrderDataT(${id})`))
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/User/${id}`).pipe(
      tap(() => this.snackBar.open("משתמש נמחק בהצלחה", "סגור", { duration: 3000 })),
      catchError(error => this.handleError(error, `deleteUser(${id})`))
    );
  }

  getTeacherCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/User/Count/Teachers`).pipe(
      retry(1),
      catchError(error => this.handleError(error, 'getTeacherCount'))
    );
  }

  getPrincipalCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/User/Count/Principals`).pipe(
      retry(1),
      catchError(error => this.handleError(error, 'getPrincipalCount'))
    );
  }

  getTotalUserCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/User/Count/Total`).pipe(
      retry(1),
      catchError(error => this.handleError(error, 'getTotalUserCount'))
    );
  }
}
