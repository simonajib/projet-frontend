import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ResourceCategory, ResourceModel } from '../../models/resource.model';
import { ResourceService } from '../../services/resource/resource.service';
import { CoursModel } from '../../models/cours.model';

@Component({
  selector: 'app-add-resource',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {
  resources: ResourceModel[] = [{} as ResourceModel];  // Initialize with one empty resource
  categories: ResourceCategory[] = [ResourceCategory.VIDEO, ResourceCategory.DOCUMENT];
  selectedFiles: File[] = [];
  coursId: number | null = null;
  successMessage = '';
  errorMessage = '';

  constructor(private resourceService: ResourceService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.coursId = params['coursId'] ? +params['coursId'] : null;
      console.log('Cours ID:', this.coursId);
    });
  }

  onFileSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles[index] = input.files[0];
    }
  }

  addResources() {
    if (this.resources.some(resource => !resource.title || !resource.type || !this.selectedFiles[this.resources.indexOf(resource)])) {
      this.errorMessage = 'Please fill out all required fields and select a file for each resource.';
      return;
    }
 
    const formDataArray = this.resources.map((resource, index) => {
      const formData = new FormData();
      formData.append('title', resource.title || '');
      formData.append('type', resource.type || '');
      formData.append('file', this.selectedFiles[index]);
      if (this.coursId) {
        formData.append('coursId', this.coursId.toString());
      }
      return formData;
    });

    // Post each resource separately
    let completedRequests = 0;
    formDataArray.forEach(formData => {
      this.resourceService.addResource(formData).subscribe({
        next: () => {
          completedRequests++;
          if (completedRequests === formDataArray.length) {
            this.successMessage = 'All resources added successfully!';
            this.errorMessage = '';
            this.resources = [{} as ResourceModel];  // Reset form
            this.selectedFiles = [];
            // Navigate to Add Assignment component with coursId
            if (this.coursId) {
              this.router.navigate(['/add-assignment'], { queryParams: { coursId: this.coursId } });
            }
          }
        },
        error: () => {
          this.errorMessage = 'Failed to add one or more resources. Please try again.';
        }
      });
    });
  }

  addResourceForm() {
    this.resources.push({} as ResourceModel); // Add a new empty resource form
  }
   // Remove a resource form
   removeResource(index: number) {
    this.resources.splice(index, 1);
    this.selectedFiles.splice(index, 1);
   }
}