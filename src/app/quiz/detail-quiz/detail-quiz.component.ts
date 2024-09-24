import { Component, OnInit } from '@angular/core';
import { QuizModel } from '../../models/quiz.model';
import { QuestionModel } from '../../models/question.model';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../services/quiz/quiz.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-quiz',
  standalone: true,
  imports: [CommonModule], // Import CommonModule for *ngFor and *ngIf
  templateUrl: './detail-quiz.component.html',
  styleUrl: './detail-quiz.component.css'
})
export class DetailQuizComponent implements OnInit {
  quiz: QuizModel | null = null;
  questions: QuestionModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const quizId = Number(params.get('id')); // Get quiz ID from route parameters
      this.loadQuiz(quizId);
    });
  }

  loadQuiz(quizId: number): void {
    this.quizService.getQuizById(quizId).subscribe(
      (quiz: QuizModel) => {
        this.quiz = quiz;
        this.questions = quiz.questions || []; // Assuming quiz has a questions property
      },
      error => {
        console.error('Error loading quiz', error);
      }
    );
  }
}