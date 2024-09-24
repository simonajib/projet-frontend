import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscriptionModel } from '../../models/subscription.model';
import { apiURL } from '../../config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {



  constructor(private http: HttpClient) {}

  // Get all subscriptions
  getAllSubscriptions(): Observable<SubscriptionModel[]> {
    return this.http.get<SubscriptionModel[]>(`${apiURL}/subscriptions`, httpOptions);
  }

  // Get a subscription by ID
  getSubscriptionById(id: number): Observable<SubscriptionModel> {
    return this.http.get<SubscriptionModel>(`${apiURL}/subscriptions/${id}`, httpOptions);
  }

  // Create a new subscription
  createSubscription(subscription: SubscriptionModel): Observable<SubscriptionModel> {
    return this.http.post<SubscriptionModel>(`${apiURL}/subscriptions`, subscription, httpOptions);
  }

  // Update an existing subscription
  updateSubscription(id: number, subscription: SubscriptionModel): Observable<SubscriptionModel> {
    return this.http.put<SubscriptionModel>(`${apiURL}/subscriptions/${id}`, subscription, httpOptions);
  }

  // Delete a subscription
  deleteSubscription(id: number): Observable<void> {
    return this.http.delete<void>(`${apiURL}/subscriptions/${id}`, httpOptions);
  }

  // Subscribe to a subscription
  subscribe(id: number): Observable<void> {
    return this.http.post<void>(`${apiURL}/subscriptions/${id}/subscribe`, {}, httpOptions);
  }

  // Unsubscribe from a subscription
  unsubscribe(id: number): Observable<void> {
    return this.http.post<void>(`${apiURL}/subscriptions/${id}/unsubscribe`, {}, httpOptions);
  }

  // Review a subscription
  reviewSubscription(id: number): Observable<void> {
    return this.http.get<void>(`${apiURL}/subscriptions/${id}/review`, httpOptions);
  }
}
