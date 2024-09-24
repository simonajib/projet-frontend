import { Component } from '@angular/core';
import {StudentModel} from "../../../models/student.model";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import { UserService } from '../../../services/user/users.service';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-student.component.html',
  styleUrl: './register-student.component.css'
})
export class RegisterStudentComponent {
  newStudent = new StudentModel()
  constructor(private userService : UserService, private router: Router) {

  }
  registerStudent(){
    this.newStudent.role =Role.STUDENT;
    this.newStudent.dateJoined = new Date();
    this.userService.createStudent(this.newStudent).subscribe(response => {
      const studentId = response.userId; // Assuming response contains the new student ID
      this.router.navigate(['/add-parent'], { queryParams: { studentId } });
  });
  }
}
