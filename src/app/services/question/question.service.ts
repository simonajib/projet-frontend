import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionModel } from '../../models/question.model';
import { apiURL } from '../../config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getAllQuestions() {
    return this.http.get<QuestionModel[]>(`${apiURL}/questions`,httpOptions);
  }
  

  getQuestionById(questionId: number){
    return this.http.get<QuestionModel>(`${apiURL}/questions/${questionId}`,httpOptions);
  }

  saveQuestion(question: QuestionModel){
    return this.http.post<QuestionModel>(`${apiURL}/questions`, question);
  }

  deleteQuestion(questionId: number){
    return this.http.delete<void>(`${apiURL}/questions/${questionId}`);
  }
}

