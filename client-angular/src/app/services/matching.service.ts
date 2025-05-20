import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"
import type { MatchingData, SortedTeacher } from "../models/matching-data.model"

import { catchError, tap } from "rxjs/operators"
import  { MatSnackBar } from "@angular/material/snack-bar"
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: "root",
})
export class MatchingService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {}

  getMatchingData(): Observable<MatchingData[]> {
    return this.http.get<MatchingData[]>(`${environment.apiUrl}/MatchingData`)
  }

  getMatchingDataById(id: number): Observable<MatchingData> {
    return this.http.get<MatchingData>(`${environment.apiUrl}/MatchingData/${id}`)
  }

  createMatchingData(matchingData: MatchingData): Observable<MatchingData> {
    return this.http.post<MatchingData>(`${environment.apiUrl}/MatchingData`, matchingData).pipe(
      tap(() => this.snackBar.open("Matching data created successfully", "Close", { duration: 3000 })),
      catchError((error) => {
        this.snackBar.open(error.error || "Failed to create matching data", "Close", { duration: 3000 })
        throw error
      }),
    )
  }

  updateMatchingData(id: number, matchingData: MatchingData): Observable<MatchingData> {
    return this.http.put<MatchingData>(`${environment.apiUrl}/MatchingData/${id}`, matchingData).pipe(
      tap(() => this.snackBar.open("Matching data updated successfully", "Close", { duration: 3000 })),
      catchError((error) => {
        this.snackBar.open(error.error || "Failed to update matching data", "Close", { duration: 3000 })
        throw error
      }),
    )
  }

  deleteMatchingData(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/MatchingData/${id}`).pipe(
      tap(() => this.snackBar.open("Matching data deleted successfully", "Close", { duration: 3000 })),
      catchError((error) => {
        this.snackBar.open(error.error || "Failed to delete matching data", "Close", { duration: 3000 })
        throw error
      }),
    )
  }
getSortedTeachers(principalId: number): Observable<SortedTeacher[]> {
  return this.http.get<SortedTeacher[]>(`${environment.apiUrl}/matching/sorted-teachers?principalId=${principalId}`);
}

}
