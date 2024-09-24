import { Component } from '@angular/core';
import { AssignmentModel } from '../../models/assignment.model';
import { AssignmentService } from '../../services/assignment/assignment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-assignment-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgxPaginationModule],
  templateUrl: './assignment-list.component.html',
  styleUrl: './assignment-list.component.css'
})
export class AssignmentListComponent {

  assignments: AssignmentModel[] = [];
  filteredAssignment: AssignmentModel[] = [];
  searchQuery: string = ''; // For storing the search query
  p: number = 1; // For pagination, initialize to page 1

  constructor(private assignmentService : AssignmentService) {}

  ngOnInit(): void {
    this.loadAssignments();
  }

  loadAssignments(): void {
    this.assignmentService.getAllAssignments().subscribe(assignments => {
      this.assignments = assignments;
      this.filteredAssignment = this.assignments;
    });
  }

  filterAssignment(): void {
    this.filteredAssignment = this.assignments.filter(assignments =>
      assignments.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      assignments.cours?.title?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  deleteAssignment(assignment : AssignmentModel){
    const message = confirm("Are you sure you want to delete this resource?");
    if (message) {
      this.assignmentService.deleteAssignmentById(assignment.assignmentId!).subscribe(()=>{
          this.loadAssignments();
      });
    }
  }
}
