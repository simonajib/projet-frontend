import { CoursModel } from "./cours.model";
import { GradeLevelModel } from "./gradelevel.models";
import { TeacherModel } from "./teacher.model";

export class ClassModel{
    classId?: number;
    name?: string;
    description?: string;
    teacher?: TeacherModel | null;
    gradeLevel? : GradeLevelModel;
}