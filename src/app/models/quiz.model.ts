import { CoursModel } from './cours.model';
import { QuestionModel } from './question.model';
import { TeacherModel } from './teacher.model';

export class  QuizModel {
  quizId?: number; // Unique identifier for each quiz
  title?: string; // Title of the quiz
  cours?: CoursModel; // Reference to the Course entity
  dueDate?: Date; // Due date for the quiz
  isAccessible?: boolean; // Indicates if the quiz is accessible
  quizDescription?: string; // Description of the quiz
  quizType?: QuizType; // Field for the quiz type, using the QuizType enum
  questions? : QuestionModel[];
}

export enum QuizType {
  EXAM = 'EXAM',        // Examen
  CONTROL = 'CONTROL',  // Contrôle
  EXERCISE = 'EXERCISE', // Exercice
  QUIZ = 'QUIZ',        // Quiz standard ou court
  HOMEWORK = 'HOMEWORK', // Devoir
  PRACTICE = 'PRACTICE', // Activité de pratique
  SURVEY = 'SURVEY',    // Sondage ou questionnaire
  PROJECT = 'PROJECT',  // Projet complexe
  FINAL = 'FINAL',      // Examen final
  MIDTERM = 'MIDTERM',  // Examen de mi-parcours
  MOCK = 'MOCK',        // Examen blanc
  REVIEW = 'REVIEW'     // Quiz de révision
}