// teacher.model.ts

import { ClassModel } from "./class.model";
import {UserModel} from "./user.model";

export class TeacherModel extends  UserModel{
  hireDate?: Date;
  subject?: string;

}
