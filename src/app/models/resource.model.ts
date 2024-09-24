import { CoursModel } from "./cours.model";

export class ResourceModel {
    resourceId?: number;
    title?: string;
    path?: string;
    type?: ResourceCategory ;
    cours?: CoursModel  | null;

}
export enum ResourceCategory {
    VIDEO = 'VIDEO',
    DOCUMENT = 'DOCUMENT'
}