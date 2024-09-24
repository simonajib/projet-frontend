import { Component, OnInit } from '@angular/core';
import { AssignmentModel } from '../../models/assignment.model';
import { AssignmentService } from '../../services/assignment/assignment.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursModel } from '../../models/cours.model';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent implements OnInit {
  assignments: AssignmentModel[] = [new AssignmentModel()];
  errorMessage: string = '';
  coursId: number | null = null;

  constructor(
    private assignmentService: AssignmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.coursId = params['coursId'] ? +params['coursId'] : null;
      console.log('Cours ID:', this.coursId);
    });
  }

  addAssignmentForm() {
    this.errorMessage = '';  // Clear any previous error messages
    this.assignments.push(new AssignmentModel());
  }

  removeAssignmentForm(index: number) {
    this.errorMessage = '';  // Clear any previous error messages
    this.assignments.splice(index, 1);
  }

  submitAssignments() {
    // Check for empty fields before submitting
    let valid = true;
    this.errorMessage = ''; // Clear previous error messages
  
    this.assignments.forEach((assignment, index) => {
      if (!assignment.title || !assignment.description) {
        this.errorMessage = `Please fill out all fields for assignment ${index + 1}.`;
        valid = false;
      }
    });
  
    if (valid) {
      // Assign the coursId to each assignment before submitting
      if (this.coursId !== null) {
        this.assignments.forEach(assignment => {
          assignment.cours = { coursId: this.coursId } as CoursModel; // Assuming coursId is a property of CoursModel
        });
      }
  
      let completedRequests = 0;
      const totalRequests = this.assignments.length;
  
      this.assignments.forEach(assignment => {
        this.assignmentService.saveAssignment(assignment).subscribe({
          next: () => {
            completedRequests++;
            if (completedRequests === totalRequests) {
              this.router.navigate(['/add-quiz'], { queryParams: { coursId: this.coursId } });
            }
          },
          error: () => {
            this.errorMessage = 'Failed to add one or more assignments. Please try again.';
          }
        });
      });
    }
  }
  
}
