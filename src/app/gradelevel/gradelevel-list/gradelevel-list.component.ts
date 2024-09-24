import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { GradeLevelModel } from '../../models/gradelevel.models';
import { GradelevelService } from '../../services/gradelevel/gradelevel.service';

@Component({
  selector: 'app-gradelevel-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule
  ],
  templateUrl: './gradelevel-list.component.html',
  styleUrls: ['./gradelevel-list.component.css'] // Corrected property name
})
export class GradelevelListComponent implements OnInit {
  gradelevels!: GradeLevelModel[];
  filteredGradelevels!: GradeLevelModel[];
  searchQuery: string = ''; // Model for search input
  p: number = 1; // Page number for pagination

  constructor(private gradelevelService: GradelevelService) {}

  ngOnInit() {
    this.loadGradeLevel(); // Load data on initialization
  }

  loadGradeLevel() {
    this.gradelevelService.getAllGradeLevels().subscribe({
      next: (g) => {
        this.gradelevels = g;
        this.filteredGradelevels = g;
      },
      error: (err) => {
        console.error('Error loading Grade Level:', err);
        // Show an error message to the user here if needed
      }
    });
  }

  deleteGradeLevel(gradeLevel: GradeLevelModel) {
    this.gradelevelService.deleteGradeLevel(gradeLevel.gradeLevelId!).subscribe({
      next: () => {
        this.loadGradeLevel();
      },
      error: (err) => {
        console.error('Error deleting Grade Level:', err);
        // Show an error message to the user here if needed
      }
    });
  }

  searchGradeLevel() {
    const query = this.searchQuery.toLowerCase();
    this.filteredGradelevels = this.gradelevels.filter(g => 
      g.levelName?.toLowerCase().includes(query) || 
      g.description?.toLowerCase().includes(query)
    );
  }
}
