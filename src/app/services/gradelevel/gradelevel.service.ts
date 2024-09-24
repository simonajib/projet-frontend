import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GradeLevelModel } from '../../models/gradelevel.models';
import { apiURL } from '../../config';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
@Injectable({
  providedIn: 'root'
})
export class GradelevelService {

  
  constructor(private http: HttpClient) { }

  // Create a new GradeLevel
  createGradeLevel(gradeLevel: GradeLevelModel){
    return this.http.post<GradeLevelModel>(`${apiURL}/grade-levels`, gradeLevel,httpOptions);
  }

  // Get a GradeLevel by ID
  getGradeLevelById(id: number) {
    return this.http.get<GradeLevelModel>(`${apiURL}/grade-levels/${id}`,httpOptions);
  }

  // Get all GradeLevels
  getAllGradeLevels(){
    return this.http.get<GradeLevelModel[]>(`${apiURL}/grade-levels`,httpOptions);
  }

  // Update a GradeLevel by ID
  updateGradeLevel(gradeLevel: GradeLevelModel) {
    return this.http.put<GradeLevelModel>(`${apiURL}/grade-levels/${gradeLevel.gradeLevelId}`, gradeLevel,httpOptions);
  }

  // Delete a GradeLevel by ID
  deleteGradeLevel(id: number){
    return this.http.delete<void>(`${apiURL}/grade-levels/${id}`,httpOptions);
  }
}