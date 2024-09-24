import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {AdministratorModel} from "../../../models/administrator.model";
import {TeacherModel} from "../../../models/teacher.model";
import {TutorModel} from "../../../models/tutor.model";
import {Role} from "../../../models/user.model";
import { UserService } from '../../../services/user/users.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./add-user.component.html",
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  newAdministrator: AdministratorModel = new AdministratorModel();
  newTutor: TutorModel = new TutorModel();
  newTeacher: TeacherModel = new TeacherModel();
  role: string = '';

  constructor(private userService: UserService, private router: Router) {}

  addUser(): void {
    // Based on the role, create role-specific user data
    switch (this.role) {
      case 'ADMINISTRATOR':
        this.newAdministrator.dateJoined = new Date();
        this.newAdministrator.role = Role.ADMINISTRATOR;
        this.userService.createAdministrator(this.newAdministrator).subscribe({
          next: (response) => {
            console.log('Administrator created successfully:', response);
            this.router.navigate(['/user-list']);
          },
          error: (error) => console.error('Error creating administrator:', error)
        });
        break;

      case 'TEACHER':
        this.newTeacher.dateJoined = new Date();
        this.newTeacher.role = Role.TEACHER;
        this.userService.createTeacher(this.newTeacher).subscribe({
          next: (response) => {
            console.log('Teacher created successfully:', response);
            this.router.navigate(['/user-list']);
          },
          error: (error) => console.error('Error creating teacher:', error)
        });
        break;

      case 'TUTOR':
        this.newTutor.dateJoined = new Date();
        this.newTutor.role = Role.TUTOR;
        this.userService.createTutor(this.newTutor).subscribe({
          next: (response) => {
            console.log('Tutor created successfully:', response);
            this.router.navigate(['/user-list']);
          },
          error: (error) => console.error('Error creating tutor:', error)
        });
        break;

      default:
        console.log('No specific role to handle.');
    }
  }
}
