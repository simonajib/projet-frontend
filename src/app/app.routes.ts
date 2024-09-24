import { Routes } from '@angular/router';
import { CoursListComponent } from './cours/cours-list/cours-list.component';
import { AddCoursComponent } from './cours/add-cours/add-cours.component';
import { EditCoursComponent } from './cours/edit-cours/edit-cours.component';
import { ClassListComponent } from './class/class-list/class-list.component';
import { AddClassComponent } from './class/add-class/add-class.component';
import { EditClassComponent } from './class/edit-class/edit-class.component';
import { AddResourceComponent } from './resource/add-resource/add-resource.component';
import { ResourceListComponent } from './resource/resource-list/resource-list.component';
import { AddAssignmentComponent } from './assignment/add-assignment/add-assignment.component';
import { AssignmentListComponent } from './assignment/assignment-list/assignment-list.component';
import { AddUserComponent } from './users/user/add-user/add-user.component';
import { UserListComponent } from './users/user/user-list/user-list.component';
import { DetailUserComponent } from './users/user/detail-user/detail-user.component';
import { RegisterStudentComponent } from './users/student/register-student/register-student.component';
import { AddParentComponent } from './users/student/add-parent/add-parent.component';
import { StudentListComponent } from './users/student/student-list/student-list.component';
import { DetailStudentComponent } from './users/student/detail-student/detail-student.component';
import { AddSubscriptionComponent } from './subscription/add-subscription/add-subscription.component';
import { GradelevelListComponent } from './gradelevel/gradelevel-list/gradelevel-list.component';
import { AddGradelevelComponent } from './gradelevel/add-gradelevel/add-gradelevel.component';
import { EditGradelevelComponent } from './gradelevel/edit-gradelevel/edit-gradelevel.component';
import { SubscriptionListComponent } from './subscription/subscription-list/subscription-list.component';
import { DetailSubscriptionComponent } from './subscription/detail-subscription/detail-subscription.component';
import { AddQuizComponent } from './quiz/add-quiz/add-quiz.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { DetailQuizComponent } from './quiz/detail-quiz/detail-quiz.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { DetailResourceComponent } from './resource/detail-resource/detail-resource.component';
import { DetailCoursComponent } from './cours/detail-cours/detail-cours.component';

export const routes: Routes = [
    {path : "grade-level-list", component : GradelevelListComponent},
    {path : "add-grade-level", component : AddGradelevelComponent},
    {path : "cours-list", component : CoursListComponent},
    {path : "edit-grade-level/:id", component : EditGradelevelComponent},

    {path : "add-cours", component : AddCoursComponent},
    {path : "edit-cours/:id", component : EditCoursComponent},
    {path : "class-list", component : ClassListComponent},
    {path : "add-class", component : AddClassComponent},
    {path : "edit-class/:id", component : EditClassComponent},
    {path : "resource-list",component : ResourceListComponent},

    {path : "add-resource", component : AddResourceComponent},
    {path : "assignment-list", component : AssignmentListComponent},
    {path : "add-assignment", component : AddAssignmentComponent},
    {path : "add-user",component : AddUserComponent },
    {path : "user-list",component : UserListComponent},
    {path : "detail-user/:id",component : DetailUserComponent},
    {path : "register-student",component : RegisterStudentComponent},
    {path : "add-parent" ,component : AddParentComponent},
    {path : "student-list",component : StudentListComponent},
    {path : "detail-student/:id",component : DetailStudentComponent},
    {path : "subscription-list",component : SubscriptionListComponent},
    {path : "detail-subscription/:id",component : DetailSubscriptionComponent},
    {path : "add-subscription",component : AddSubscriptionComponent},
    {path : "add-quiz" ,component : AddQuizComponent},
    {path : "quiz-list",component : QuizListComponent},
    {path : "detail-quiz/:id",component : DetailQuizComponent},
    {path : "dashboard",component : DashboardComponent},
    { path: 'detail-resource/:id', component: DetailResourceComponent },
    { path: 'detail-cours/:id', component: DetailCoursComponent },

    {path : "", redirectTo : "dashboard", pathMatch : "full" }

];
