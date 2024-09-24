import { Component, OnInit } from '@angular/core';
import { UserModel } from "../../../models/user.model";
import {ActivatedRoute, RouterLink} from "@angular/router";
import { TeacherModel } from "../../../models/teacher.model";
import { TutorModel } from "../../../models/tutor.model";
import { AdministratorModel } from "../../../models/administrator.model";
import {DatePipe, NgIf} from "@angular/common";
import { UserService } from '../../../services/user/users.service';

@Component({
  selector: 'app-detail-user',
  standalone: true,
  imports: [NgIf, DatePipe],
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.css'
})
export class DetailUserComponent implements OnInit {

  currentUser: UserModel | undefined;
  currentTeacher: TeacherModel | undefined;
  currentTutor: TutorModel | undefined;
  currentAdministrator: AdministratorModel | undefined;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.params['id'];

    // Fetch user details and typecast the response to UserModel
    this.userService.detailUser(userId).subscribe((user: UserModel) => {
      this.currentUser = user;

      // Load role-specific details based on user role
      if (user.role === 'TEACHER') {
        this.userService.detailTeacher(userId).subscribe((teacher: TeacherModel) => this.currentTeacher = teacher);
      } else if (user.role === 'TUTOR') {
        this.userService.detailTutor(userId).subscribe((tutor: TutorModel) => this.currentTutor = tutor);
      } else if (user.role === 'ADMINISTRATOR') {
        this.userService.detailAdministrator(userId).subscribe((administrator: AdministratorModel) => this.currentAdministrator = administrator);
      }
    });
  }

}
