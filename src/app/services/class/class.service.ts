import { Injectable } from "@angular/core";
import { ClassModel } from "../../models/class.model";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { apiURL } from "../../config";
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TeacherModel } from "../../models/teacher.model";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})

  export class ClassService {
    classes: ClassModel[] = [];
    teachers: TeacherModel[] = [];
    
    teacher!: TeacherModel;
    
    constructor(private http: HttpClient) { }
  
    getTeacherName(teacherId: number): string {
      const teacher = this.teachers.find(t => t.userId === teacherId);
      return teacher ? teacher.name ?? 'Unknown' : 'Unknown';
    }
    

  classesList(): Observable<ClassModel[]> {
    return this.http.get<ClassModel[]>(`${apiURL}/classes`, httpOptions).pipe(
      tap((classes: ClassModel[]) => {
        console.log('Fetched classes:', classes); // Log classes
      }),
      catchError(this.handleError)
    );
  }

  addClass(newClass: ClassModel): Observable<ClassModel> {
    return this.http.post<ClassModel>(`${apiURL}/classes`, newClass, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteClass(id: number): Observable<void> {
    return this.http.delete<void>(`${apiURL}/classes/${id}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  editClass(id: number): Observable<ClassModel> {
    return this.http.get<ClassModel>(`${apiURL}/classes/${id}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateClass(classToUpdate: ClassModel): Observable<ClassModel> {
    return this.http.put<ClassModel>(`${apiURL}/classes`, classToUpdate, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  sortClass() {
    this.classes.sort((x, y) => (x.classId! > y.classId! ? 1 : -1));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong; please try again later.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
      errorMessage = `Server error: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
  teacherList() {
    return this.http.get<TeacherModel[]>(`${apiURL}/teachers`, httpOptions);
  }

  editTeacher(id: number) {
    this.teacher = this.teachers.find(t => t.userId  == id)!;
    return this.teacher;
  }
  
}
