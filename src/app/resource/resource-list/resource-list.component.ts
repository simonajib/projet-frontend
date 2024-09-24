import { Component, OnInit } from '@angular/core';
import { ResourceModel } from '../../models/resource.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ResourceService } from '../../services/resource/resource.service';

@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgxPaginationModule],
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css'] // Corrected typo
})
export class ResourceListComponent implements OnInit {
  resources: ResourceModel[] = [];
  filteredResources: ResourceModel[] = [];
  searchQuery: string = ''; // For storing the search query
  p: number = 1; // For pagination, initialize to page 1

  constructor(private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources(): void {
    this.resourceService.getAllResources().subscribe(resources => {
      this.resources = resources;
      this.filteredResources = this.resources;
    });
  }

  filterResources(): void {
    this.filteredResources = this.resources.filter(resource =>
      resource.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      resource.type?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  deleteResource(resource : ResourceModel){
    const message = confirm("Are you sure you want to delete this resource?");
    if (message) {
      this.resourceService.deleteResource(resource.resourceId!).subscribe(()=>{
          this.loadResources();
      });
    }
  }
}
