import { PaymentModel } from "./payment.model";

export class SubscriptionModel{
    subscriptionId? : number;
    type? : SubscriptionType;
    startDate? : Date;
    endDate? : Date;
    payment? : PaymentModel;

  }
  export enum SubscriptionType {

    MONTHLY = 'MONTHLY',
    SEMESTRIAL = 'SEMESTRIAL',
    ANNUAL = 'ANNUAL'
  }
  