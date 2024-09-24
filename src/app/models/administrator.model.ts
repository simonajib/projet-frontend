// administrator.model.ts
import {UserModel} from "./user.model";

export class AdministratorModel extends UserModel {
  department? : string;
  officeNumber? : number;
  phoneExtension? : number;
}


