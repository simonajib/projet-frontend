import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CoursModel } from '../../models/cours.model';
import { CoursService } from '../../services/cours/cours.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'; // Import the pagination module

@Component({
  selector: 'app-cours-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgxPaginationModule], // Include pagination module
  templateUrl: './cours-list.component.html',
  styleUrl: './cours-list.component.css'
})
export class CoursListComponent {
  courses!: CoursModel[];
  filteredCourses!: CoursModel[];
  searchQuery: string = ''; // For storing the search query
  p: number = 1; // For pagination, initialize to page 1
  constructor(private coursService: CoursService) {
    this.loadCours();
  }

  // Load all courses and apply filtering
  loadCours() {
    this.coursService.coursesList().subscribe(c => {
      this.courses = c;
      this.filteredCourses = this.courses; // Initially, show all courses
    });
  }

  // Filter courses based on search query
  filterCourses() {
    this.filteredCourses = this.courses.filter(course =>
      course.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      course.content?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Delete a course
  deleteCours(cours: CoursModel) {
    const message = confirm("Are you sure you want to delete this course?");
    if (message) {
      this.coursService.deleteCours(cours.coursId!).subscribe(() => {
        this.loadCours();
      });
    }
  }
}
