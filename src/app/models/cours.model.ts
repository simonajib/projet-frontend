import { AssignmentModel } from "./assignment.model";
import { ClassModel } from "./class.model";
import { QuizModel } from "./quiz.model";
import { ResourceModel } from "./resource.model";


export class CoursModel {
    coursId?: number;            // Identifiant unique pour chaque cours, optionnel car il peut être généré automatiquement
    title?: string;              // Titre du cours
    content?: string;            // Contenu du cours
    createdDate?: Date;          // Date de création du cours
    lastUpdatedDate?: Date;      // Date de la dernière mise à jour du cours
    classe?: ClassModel | null;  // Classe à laquelle le cours est associé, optionnel pour les opérations de création
    resources?: ResourceModel[];
    assignments?: AssignmentModel[];
    quizzes?: QuizModel[];
}
