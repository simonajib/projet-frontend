import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentModel } from '../../../models/parent.model';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user/users.service';
import { Role } from '../../../models/user.model';

@Component({
  selector: 'app-register-parent',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-parent.component.html',
  styleUrls: ['./add-parent.component.css']
})
export class AddParentComponent implements OnInit {
  newParent = new ParentModel();
  studentId!: number;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.studentId = +params['studentId']; // Convert to number
    });
  }

  registerParent() {
    this.newParent.role = Role.PARENT;
    this.newParent.dateJoined = new Date();
    this.userService.createParent(this.newParent).subscribe({
      next: (parentResponse) => {
        const parentId = parentResponse.userId; // Ensure this matches your API response
        if (parentId) {
          this.linkParentToStudent(parentId);
        } else {
          console.error('Failed to create parent, no ID returned');
        }
      },
      error: (err) => {
        console.error('Error creating parent:', err);
      }
    });
  }

  linkParentToStudent(parentId: number) {
    this.userService.getStudentById(this.studentId).subscribe({
      next: (student) => {
        if (!student.parent) {
          student.parent = {}; // Initialize if not present
        }
        student.parent.userId = parentId; // Ensure this matches your StudentModel

        this.userService.updateStudent(student).subscribe({
          next: () => {
            console.log('Parent linked to student successfully.');
            // Navigate to the 'add-subscription' page with studentId as a query parameter
            this.router.navigate(['/add-subscription'], { queryParams: { studentId: this.studentId } });
          },
          error: (err) => {
            console.error('Error updating student:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error retrieving student:', err);
      }
    });
  }
}
