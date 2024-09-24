import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CoursModel } from '../../models/cours.model';
import { FormsModule } from '@angular/forms';
import { CoursService } from '../../services/cours/cours.service';
import { ClassModel } from '../../models/class.model';
import { ResourceModel } from '../../models/resource.model';

@Component({
  selector: 'app-add-cours',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-cours.component.html',
  styleUrl: './add-cours.component.css'
})
export class AddCoursComponent {
 newCours = new CoursModel();
 classes! : ClassModel[];
 newClass! : ClassModel;
 newClassId! : number;
 //IdUser
 constructor(private coursService : CoursService, private router : Router){
  
  coursService.classesList().subscribe(c => {this.classes = c; })
  
  // coursService.classesList().subscribe(classes => {
    //this.classes = classes.filter(c => c.teacher?.userId === this.IdUser)})
  //this.classes = coursService.classesList();
 }
 addCours() {
  this.newCours.createdDate = new Date(); 
  this.newCours.lastUpdatedDate = new Date();
  this.newCours.classe = this.classes.find(c => c.classId == this.newClassId);
  
  this.coursService.addCours(this.newCours).subscribe(c => {
    // Navigate to resource add page with the course ID
    this.router.navigate(['/add-resource'], { queryParams: { coursId: c.coursId } });
  });
}
}

  
 
