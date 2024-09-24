import {UserModel} from "./user.model";
import {ParentModel} from "./parent.model";
import { GradeLevelModel } from "./gradelevel.models";
import { PaymentModel } from "./payment.model";

export class StudentModel extends UserModel {
  gradeLevel?: GradeLevelModel;
  parent? : ParentModel;

}
