import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { SubscriptionModel } from '../../models/subscription.model';
import { SubscriptionService } from '../../services/subscription/subscription.service';

@Component({
  selector: 'app-subscription-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule, RouterModule],
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {

  subscriptions: SubscriptionModel[] = [];
  filteredSubscription: SubscriptionModel[] = []; // Filtered list for search

  p: number = 1; // Page number for pagination
  searchQuery: string = ''; // Search input

  constructor(private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.subscriptionService.getAllSubscriptions().subscribe(
      (data: SubscriptionModel[]) => {
        this.subscriptions = data;
        this.filteredSubscription = data; // Initialize filtered list
      },
      error => console.error('Error fetching subscriptions', error)
    );
  }

  onSearch(): void {
    let query = this.searchQuery.toLowerCase();

    this.filteredSubscription = this.subscriptions.filter(subscription => {
      let matchesName = subscription.payment?.student?.name?.toLowerCase().includes(query) || !query;
      let matchesType = subscription.type?.toLowerCase().includes(query) || !query;
      return matchesName || matchesType;
    });
  }
}
