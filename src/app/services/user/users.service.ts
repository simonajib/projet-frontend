import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { TeacherModel } from '../../models/teacher.model';
import { AdministratorModel } from '../../models/administrator.model';
import { apiURL } from '../../config';
import { TutorModel } from '../../models/tutor.model';
import { StudentModel } from '../../models/student.model';
import { ParentModel } from '../../models/parent.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  // Get all users
  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${apiURL}/users`, httpOptions)
      .pipe(
        catchError(this.handleError) // Handle errors
      );
  }
  TeacherList() {
    return this.http.get<TeacherModel[]>(`${apiURL}/teachers`, httpOptions);
  }
  AdministratorList() {
    return this.http.get<AdministratorModel[]>(`${apiURL}/administrators`, httpOptions);
  }
  TutorList() {
    return this.http.get<TutorModel[]>(`${apiURL}/tutors`, httpOptions);
  }
  createTeacher(teacher: TeacherModel){
    return this.http.post<TeacherModel>(`${apiURL}/teachers`, teacher, httpOptions)

  }
  createTutor(tutor: TutorModel){
    return this.http.post<TutorModel>(`${apiURL}/tutors`, tutor, httpOptions)
  }
  createAdministrator(administrator: AdministratorModel){
    return this.http.post<AdministratorModel>(`${apiURL}/administrators`, administrator, httpOptions)
  }
  // Handle HTTP errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // Log the error to the console
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
   deleteTutor(id:number) {
    return this.http.delete(`${apiURL}/tutors/${id}`, httpOptions);
   }
  deleteTeacher(id:number) {
    return this.http.delete(`${apiURL}/teachers/${id}`, httpOptions);
  }
  deleteAdministrator(id:number) {
    return this.http.delete(`${apiURL}/administrators/${id}`, httpOptions);
  }
  detailTutor(id:number){
    return this.http.get(`${apiURL}/tutors/${id}`, httpOptions);
  }
  detailTeacher(id:number){
    return this.http.get(`${apiURL}/teachers/${id}`, httpOptions);
  }
  detailAdministrator(id:number){
    return this.http.get(`${apiURL}/administrators/${id}`, httpOptions);
  }
  detailUser(id:number){
    return this.http.get(`${apiURL}/users/${id}`, httpOptions);
  }
  createStudent(student: StudentModel){
    return this.http.post<StudentModel>(`${apiURL}/students`, student, httpOptions);
  }
  createParent(parent: ParentModel){
    return this.http.post<ParentModel>(`${apiURL}/parents`, parent, httpOptions);
  }
  getStudentById(studentId: number) {
    return this.http.get<StudentModel>(`${apiURL}/students/${studentId}`,httpOptions);
  }
  updateStudent(student: StudentModel): Observable<StudentModel> {
    return this.http.put<StudentModel>(`${apiURL}/students/${student.userId}`, student, httpOptions);
  }
  getAllStudent(){
    return this.http.get<StudentModel[]>(`${apiURL}/students`, httpOptions);
  }

  getParentById(parentId: number) {
    return this.http.get<ParentModel>(`${apiURL}/parents/${parentId}`,httpOptions);
  }
 

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${apiURL}/users/login`, { email, password });
  }
}
