import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuestionModel } from '../../models/question.model';
import { QuizModel, QuizType } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz/quiz.service';
import { QuestionService } from '../../services/question/question.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  newQuiz: QuizModel = new QuizModel();
  questions: QuestionModel[] = [];
  quizTypes = Object.values(QuizType);
  coursId: number | null = null;

  constructor(
    private quizService: QuizService,
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.coursId = params['coursId'] ? +params['coursId'] : null;
      if (this.coursId !== null) {
        // Set the coursId on the newQuiz
        this.newQuiz.cours = { coursId: this.coursId } as any; // Adjust according to your QuizModel
      
      }
    });
  }

  addQuiz() {
    // Ensure isAccessible is set as a boolean
    this.newQuiz.isAccessible = this.newQuiz.isAccessible ?? false; // Defaults to false if not set

    // Set a default or selected quiz type
    this.newQuiz.quizType = this.newQuiz.quizType || this.quizTypes[0]; // Defaults to the first type

    // Log for debugging
    console.log('New Quiz:', this.newQuiz);
    console.log('Questions:', this.questions);

    // Create the quiz
    this.quizService.createQuiz(this.newQuiz).subscribe((createdQuiz) => {
      this.questions.forEach((question) => {
        question.quiz = createdQuiz;
        this.questionService.saveQuestion(question).subscribe();
      });
      this.router.navigate(['/cours-list']);
    });
  }

  addQuestion() {
    this.questions.push(new QuestionModel());
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  addChoice(question: QuestionModel) {
    // Add an empty string to the choices array to allow for new input
    question.choices = (question.choices || []).concat(['']);
  }
  
  removeChoice(question: QuestionModel, index: number) {
    // Remove the choice at the specified index
    if (question.choices && question.choices.length > index) {
      question.choices.splice(index, 1);
    }
  }
}
