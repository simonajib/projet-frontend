import { CoursModel } from "./cours.model";

export class AssignmentModel {
    assignmentId?: number;
    title?: string;
    description?: string;
    cours? : CoursModel;
    
}
