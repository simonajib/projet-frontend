import { Component, OnInit, Input } from '@angular/core';
import { ResourceModel } from '../../models/resource.model'; // Adjust the import path as needed
import { ResourceService } from '../../services/resource/resource.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-resource',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-resource.component.html',
  styleUrls: ['./detail-resource.component.css']
})
export class DetailResourceComponent implements OnInit {
  resource: ResourceModel | undefined;
  videoUrl: string | undefined;

  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Convert the ID to a number
      if (id) {
        this.getResourceDetails(id);
      }
    });
  }

  getResourceDetails(id: number): void {
    this.resourceService.getResourceById(id).subscribe(
      (data: ResourceModel) => {
        this.resource = data;
      },
      (error) => {
        console.error('Error fetching resource details', error);
      }
    );
  }

  downloadResource(id: number): void {
    this.resourceService.downloadDocument(id).subscribe((blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const filename = `${ this.resource?.title || 'document'}.pdf`;
      a.download = filename; // Assign the filename with .pdf extension
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }));
  }

  playVideo(id: number): void {
    this.resourceService.streamVideo(id).subscribe(blob => {
      this.videoUrl = window.URL.createObjectURL(blob); // Assign the video URL to a component property
    });
  }
}
