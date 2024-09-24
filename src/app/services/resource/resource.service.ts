import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResourceCategory, ResourceModel } from '../../models/resource.model';
import { apiURL } from '../../config';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
 

  constructor(private http: HttpClient) { }

  getAllResources(): Observable<ResourceModel[]> {
    return this.http.get<ResourceModel[]>(`${apiURL}/resources`,  httpOptions);
  }

  getResourceById(id: number){
    return this.http.get<ResourceModel>(`${apiURL}/resources/${id}`, httpOptions);
  }

  addResource(formData: FormData): Observable<any> {
    return this.http.post(`${apiURL}/resources`, formData);
}

  deleteResource(id: number){
    return this.http.delete<void>(`${apiURL}/resources/${id}`,httpOptions);
  }
  downloadDocument(id: number): Observable<Blob> {
    return this.http.get(`${apiURL}/resources/download/${id}`, {
      responseType: 'blob'
    });
  }
  streamVideo(id: number): Observable<Blob> {
  return this.http.get(`${apiURL}/resources/stream/${id}`, {
    responseType: 'blob'
  });
}
}
