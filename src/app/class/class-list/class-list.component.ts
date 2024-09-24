import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ClassService } from '../../services/class/class.service';
import { ClassModel } from '../../models/class.model';


@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule
  ],
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  classes!: ClassModel[];
  filteredClasses!: ClassModel[]; // Filtered list for search
  searchQuery: string = ''; // Model for search input
  p: number = 1; // Page number for pagination


  constructor(private classService: ClassService) {}

  ngOnInit() {
    this.loadClasses();
  }

  loadClasses() {
    this.classService.classesList().subscribe({
      next: (c) => {
        this.classes = c;
        this.filteredClasses = c; // Initialize filtered list
      },
      error: (err) => {
        console.error('Error loading classes:', err);
        // You might want to show an error message to the user here
      }
    });
  }
  getTeacherName(teacherId?: number): string {
    return teacherId !== undefined ? this.classService.getTeacherName(teacherId) : 'Unknown';
  }

  deleteClass(classDelete: ClassModel) {
    this.classService.deleteClass(classDelete.classId!).subscribe({
      next: () => {
        this.loadClasses();
      },
      error: (err) => {
        console.error('Error deleting class:', err);
        // You might want to show an error message to the user here
      }
    });
  }

  searchClasses() {
    const query = this.searchQuery.toLowerCase();
    this.filteredClasses = this.classes.filter(c => 
      (c.name?.toLowerCase().includes(query) || 
      c.description?.toLowerCase().includes(query) || 
      this.getTeacherName(c.teacher?.userId).toLowerCase().includes(query))
    );
  }
}
