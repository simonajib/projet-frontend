import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubscriptionModel, SubscriptionType } from '../../models/subscription.model';
import { GradeLevelModel } from '../../models/gradelevel.models';
import { GradelevelService } from '../../services/gradelevel/gradelevel.service';
import { PaymentModel } from '../../models/payment.model';
import { SubscriptionService } from '../../services/subscription/subscription.service';
import { PaymentService } from '../../services/payment/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentModel } from '../../models/student.model';
import { UserService } from '../../services/user/users.service';

@Component({
  selector: 'app-add-subscription',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.css']
})
export class AddSubscriptionComponent implements OnInit {
  newPayment: PaymentModel = new PaymentModel();
  newSubscription: SubscriptionModel = new SubscriptionModel();
  gradelevels!: GradeLevelModel[];
  newGradelevelId?: number;
  subscriptionTypes = Object.values(SubscriptionType);
  subscriptionPlans = [
    { name: 'École', price: 4900 },
    { name: 'Lumière d\'école', price: 2900 },
    { name: 'Exprimer', price: 1000 }
  ];
  selectedPlan?: { name: string, price: number };
  isSubmitting: boolean = false;  
  studentId!: number;
  successMessage?: string;
  errorMessage?: string;

  constructor(
    private gradelevelService: GradelevelService,
    private subscriptionService: SubscriptionService,
    private paymentService: PaymentService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.studentId = +params['studentId']; 
    });

    this.gradelevelService.getAllGradeLevels().subscribe(g => {
      this.gradelevels = g;
    });
  }

  selectSubscriptionType(type: SubscriptionType) {
    this.newSubscription.type = type;
    this.calculateAmount();  
  }

  selectGradeLevel(gradeLevelId: number) {
    this.newGradelevelId = gradeLevelId;
  }

  selectPlan(plan: { name: string, price: number }) {
    this.selectedPlan = plan;
    this.calculateAmount();  
  }

  calculateAmount() {
    if (this.selectedPlan && this.newSubscription.type) {
      const multiplier = this.getSubscriptionTypeMultiplier(this.newSubscription.type);
      this.newPayment.amount = this.selectedPlan.price * multiplier;
    }
  }

  getSubscriptionTypeMultiplier(type: SubscriptionType): number {
    switch (type) {
      case SubscriptionType.MONTHLY:
        return 1;
      case SubscriptionType.SEMESTRIAL:
        return 6;
      case SubscriptionType.ANNUAL:
        return 12;
      default:
        return 1;
    }
  }

  addSubscription() {
    if (this.isSubmitting) return;

    if (!this.newPayment.amount) {
      this.errorMessage = 'Amount is not calculated. Please ensure you have selected a plan and subscription type.';
      return;
    }

    if (this.selectedPlan && this.newGradelevelId && this.newPayment.amount) {
      this.isSubmitting = true;
      const selectedGradeLevel = this.gradelevels.find(g => g.gradeLevelId === this.newGradelevelId);
      
      if (!selectedGradeLevel) {
        this.errorMessage = 'Invalid grade level selected.';
        this.isSubmitting = false;
        return;
      }

      this.newPayment.grade = selectedGradeLevel;
      this.newPayment.date = new Date();
      this.newPayment.student = { userId: this.studentId } as StudentModel;
      this.newSubscription.startDate = new Date();
      this.newSubscription.endDate = this.calculateEndDate(this.newSubscription.startDate, this.newSubscription.type!);

      this.updateGradeStudent(this.newGradelevelId);  // Update grade level first
      
      this.paymentService.addPayment(this.newPayment).subscribe({
        next: response => {
          this.newSubscription.payment = response;
          this.subscriptionService.createSubscription(this.newSubscription).subscribe({
            next: subscription => {
              this.successMessage = 'Subscription added successfully!';
              this.errorMessage = undefined;
              this.isSubmitting = false;
              this.router.navigate(['/student-list']);
            },
            error: error => {
              this.errorMessage = 'Error adding subscription. Please try again later.';
              this.isSubmitting = false;
            }
          });
        },
        error: error => {
          this.errorMessage = 'Error processing payment. Please try again later.';
          this.isSubmitting = false;
        }
      });
    } else {
      this.errorMessage = 'Please select a plan, grade level, and ensure the payment details are complete.';
    }
  }

  updateGradeStudent(newGradelevelId: number) {
    this.userService.getStudentById(this.studentId).subscribe({
      next: (student) => {
        student.gradeLevel = this.gradelevels.find(g => g.gradeLevelId === newGradelevelId) || undefined;
        this.userService.updateStudent(student).subscribe({
          next: () => {
            console.log('Updated grade level for student successfully.');
          },
          error: (err) => {
            console.error('Error updating student:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error retrieving student:', err);
      }
    });
  }

  calculateEndDate(startDate: Date, type: SubscriptionType): Date {
    const endDate = new Date(startDate);
    switch (type) {
      case SubscriptionType.MONTHLY:
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case SubscriptionType.SEMESTRIAL:
        endDate.setMonth(endDate.getMonth() + 6);
        break;
      case SubscriptionType.ANNUAL:
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
    }
    return endDate;
  }
}
