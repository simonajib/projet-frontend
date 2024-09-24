import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../services/stats/stats.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],  // Add `CommonModule` to use basic directives like `ngFor`
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats: { name: string, value: number }[] = [];

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.statsService.getCounts().subscribe(counts => {
      this.stats = [
        { name: 'Students', value: counts.students },
        { name: 'Parents', value: counts.parents },
        { name: 'Tutors', value: counts.tutors },
        { name: 'Teachers', value: counts.teachers },
        { name: 'Administrators', value: counts.administrators },
        { name: 'Grade Levels', value: counts.gradeLevels },
        { name: 'Classes', value: counts.classes },
        { name: 'Courses', value: counts.courses }
      ];
    });
  }
  getIcon(name: string): string {
    switch (name) {
      case 'Students': return 'fas fa-user-graduate';
      case 'Parents': return 'fas fa-users';
      case 'Tutors': return 'fas fa-user';
      case 'Teachers': return 'fas fa-chalkboard-teacher';
      case 'Administrators': return 'fas fa-user-shield';
      case 'Grade Levels': return 'fas fa-graduation-cap';
      case 'Classes': return 'fas fa-school';
      case 'Courses': return 'fas fa-book';
      default: return 'fas fa-info-circle';
    }
  }
}