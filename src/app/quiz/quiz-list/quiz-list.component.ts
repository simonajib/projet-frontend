import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz/quiz.service';
import { QuizModel } from '../../models/quiz.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule
  ],
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  quizzes: QuizModel[] = [];
  filteredQuizzes: QuizModel[] = [];
  searchQuery: string = '';
  p: number = 1; // Pagination current page

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe(
      (quizzes: QuizModel[]) => {
        this.quizzes = quizzes;
        this.filteredQuizzes = this.quizzes; // Initialize with all quizzes
      }
    );
  }

  searchQuizzes(): void {
    if (this.searchQuery) {
      this.filteredQuizzes = this.quizzes.filter(quiz =>
        quiz.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        quiz.quizDescription?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredQuizzes = this.quizzes;
    }
  }

  deleteQuiz(quiz: QuizModel): void {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.quizService.deleteQuiz(quiz.quizId!).subscribe(
        () => {
          this.quizzes = this.quizzes.filter(q => q.quizId !== quiz.quizId);
          this.searchQuizzes(); // Refresh the list
        },
        error => {
          console.error('Error deleting quiz', error);
        }
      );
    }
  }
}
