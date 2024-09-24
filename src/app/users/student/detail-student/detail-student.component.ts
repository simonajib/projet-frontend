import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentModel } from '../../../models/student.model';
import { UserModel } from '../../../models/user.model';
import { ParentModel } from '../../../models/parent.model';
import { DatePipe, NgIf } from '@angular/common';
import { UserService } from '../../../services/user/users.service';

@Component({
  selector: 'app-detail-student',
  standalone: true,
  imports: [
    DatePipe,
    NgIf
  ],
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.css']
})
export class DetailStudentComponent implements OnInit {
  currentUser: UserModel | undefined;
  currentStudent: StudentModel | undefined;
  studentParent: ParentModel | undefined;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const studentId = +this.activatedRoute.snapshot.params['id'];
    this.loadStudentDetails(studentId);
  }

  loadStudentDetails(studentId: number): void {
    this.userService.getStudentById(studentId).subscribe({
      next: (student) => {
        this.currentStudent = student;
        this.loadParentDetails(student.parent?.userId);
      },
      error: (err) => console.error('Error loading student details', err)
    });
  }

  loadParentDetails(parentId: number | undefined): void {
    if (parentId) {
      this.userService.getParentById(parentId).subscribe({
        next: (parent) => {
          this.studentParent = parent;
        },
        error: (err) => console.error('Error loading parent details', err)
      });
    }
  }
}
