import { ClassModel } from "./class.model";
import { GradeLevelModel } from "./gradelevel.models";
import { StudentModel } from "./student.model";
import { SubscriptionModel } from "./subscription.model";

export class PaymentModel{
    paymentId? : number;
    amount? :number;
    date? : Date;
    grade? : GradeLevelModel;
    student? : StudentModel;

  }