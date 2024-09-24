import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuizModel } from '../../models/quiz.model';
import { apiURL } from '../../config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  
  constructor(private http: HttpClient) { }

  getAllQuizzes(){
    return this.http.get<QuizModel[]>(`${apiURL}/quizzes`,  httpOptions);
  }
  getQuizById(quizId: number){
    return this.http.get<QuizModel>(`${apiURL}/quizzes/${quizId}`);
  }

  createQuiz(quiz: QuizModel){
    return this.http.post<QuizModel>(`${apiURL}/quizzes`, quiz);
  }

  updateQuiz(quizId: number, quiz: QuizModel) {
    return this.http.put<QuizModel>(`${apiURL}/quizzes/${quizId}`, quiz);
  }

  deleteQuiz(quizId: number){
    return this.http.delete<void>(`${apiURL}/quizzes/${quizId}`);
  }

  deleteAllQuizzes() {
    return this.http.delete<void>(`${apiURL}/quizzes`);
  }
}
  


