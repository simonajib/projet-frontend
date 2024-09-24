import { Component, OnInit } from '@angular/core';
import { SubscriptionModel } from '../../models/subscription.model';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionService } from '../../services/subscription/subscription.service';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-detail-subscription',
  standalone: true,
  imports: [DatePipe, NgIf],
  templateUrl: './detail-subscription.component.html',
  styleUrls: ['./detail-subscription.component.css'] // Ensure correct CSS file name
})
export class DetailSubscriptionComponent implements OnInit {
  currentSubscription: SubscriptionModel | undefined; // Use undefined initially
  loading = true;
  error: string | undefined;

  constructor(
    private subscriptionService: SubscriptionService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const subscriptionId = +this.activatedRoute.snapshot.params['id'];
    this.loadSubscriptionDetails(subscriptionId);
  }

  loadSubscriptionDetails(subscriptionId: number): void {
    this.subscriptionService.getSubscriptionById(subscriptionId).subscribe(
      (data: SubscriptionModel) => {
        this.currentSubscription = data;
        this.loading = false;
      },
      error => {
        console.error('Error fetching subscription details', error);
        this.error = 'Failed to load subscription details.';
        this.loading = false;
      }
    );
  }
}
