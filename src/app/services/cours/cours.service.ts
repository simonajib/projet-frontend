import { Injectable } from '@angular/core';
import { CoursModel } from '../../models/cours.model';
import { ClassModel } from '../../models/class.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../../config';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  courses: CoursModel[];
  cours!: CoursModel;
  classes: ClassModel[];
  class!: ClassModel;
  
  constructor(private http: HttpClient) {
    this.classes = [];
    this.courses = [];
   
  }

  // Cours Methods
  coursesList() {
    return this.http.get<CoursModel[]>(`${apiURL}/cours`, httpOptions);
  }

  addCours(newCours: CoursModel) {
    return this.http.post<CoursModel>(`${apiURL}/cours`, newCours, httpOptions);
  }

  deleteCours(id: number) {
    return this.http.delete(`${apiURL}/cours/${id}`, httpOptions);
  }

  editCours(id: number) {
    return this.http.get<CoursModel>(`${apiURL}/cours/${id}`);
  }

  updateCours(cours: CoursModel) {
    return this.http.put<CoursModel>(`${apiURL}/cours`, cours, httpOptions);
  }

  sortCours() {
    this.courses.sort((x, y) => (x.coursId! > y.coursId! ? 1 : -1));
  }

  // Class Methods
  classesList() {
    return this.http.get<ClassModel[]>(`${apiURL}/classes`, httpOptions);
  }

  editClass(id: number) {
    this.class = this.classes.find(c => c.classId == id)!;
    return this.class;
  }
  getCoursById(id: number){
    return this.http.get<CoursModel>(`${apiURL}/cours/${id}`);
  }
}