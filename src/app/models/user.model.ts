export class UserModel{
  userId? : number;
  name? : string;
  email? : string;
  password? : string;
  role? : Role;
  dateJoined? : Date;
}
export enum Role {

  ADMINISTRATOR = 'ADMINISTRATOR',
  TEACHER = 'TEACHER',
  TUTOR = 'TUTOR',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT'
}
