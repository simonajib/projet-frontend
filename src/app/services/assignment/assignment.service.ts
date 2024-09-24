import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from '../../config'; // Import your API base URL
import { AssignmentModel } from '../../models/assignment.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {


  constructor(private http: HttpClient) { }

  // Save a new assignment
  saveAssignment(assignment: AssignmentModel): Observable<AssignmentModel> {
    return this.http.post<AssignmentModel>(`${apiURL}/assignments`, assignment, httpOptions);
  }

  // Update an existing assignment
  updateAssignment(assignment: AssignmentModel): Observable<AssignmentModel> {
    return this.http.put<AssignmentModel>(`${apiURL}/assignments`, assignment, httpOptions);
  }

  // Delete an assignment by id
  deleteAssignmentById(id: number): Observable<void> {
    return this.http.delete<void>(`${apiURL}/assignments/${id}`, httpOptions);
  }

  // Delete all assignments
  deleteAllAssignments(): Observable<void> {
    return this.http.delete<void>(`${apiURL}/assignments`, httpOptions);
  }

  // Get an assignment by id
  getAssignmentById(id: number): Observable<AssignmentModel> {
    return this.http.get<AssignmentModel>(`${apiURL}/assignments/${id}`);
  }

  // Get all assignments
  getAllAssignments(): Observable<AssignmentModel[]> {
    return this.http.get<AssignmentModel[]>(`${apiURL}/assignments`);
  }
}
