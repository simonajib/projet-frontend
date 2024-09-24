import { Component, OnInit } from '@angular/core';
import { CoursModel } from '../../models/cours.model';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../../services/resource/resource.service';
import { CoursService } from '../../services/cours/cours.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-cours',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-cours.component.html',
  styleUrl: './detail-cours.component.css'
})
export class DetailCoursComponent implements OnInit {
  course: CoursModel | undefined;
  videoUrl: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private courseService: CoursService,
    private resourceService: ResourceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const courseId = Number(params.get('id')); // Get course ID from route parameters
      this.loadCourse(courseId);
    });
  }

  loadCourse(courseId: number): void {
    this.courseService.getCoursById(courseId).subscribe(
      (course: CoursModel) => {
        this.course = course;
      });
     
  }

  downloadResource(resourceId: number): void {
    this.resourceService.downloadDocument(resourceId).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const filename = `${this.course?.title || 'document'}.pdf`;
      a.download = filename; // Assign the filename with .pdf extension
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  playVideo(resourceId: number): void {
    this.resourceService.streamVideo(resourceId).subscribe(blob => {
      this.videoUrl = window.URL.createObjectURL(blob);
    });
  }
}