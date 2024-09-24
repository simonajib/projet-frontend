import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CoursModel } from '../../models/cours.model';
import { CoursService } from '../../services/cours/cours.service';
import { CommonModule } from '@angular/common';
import { ClassModel } from '../../models/class.model';

@Component({
  selector: 'app-edit-cours',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-cours.component.html',
  styleUrl: './edit-cours.component.css'
})
export class EditCoursComponent implements OnInit {
  currentCours = new CoursModel();
  classes! : ClassModel[];
  newClass! : ClassModel;
  newClassId! : number;
  constructor(
     private  coursService : CoursService , 
     private activateRoute : ActivatedRoute,
     private router : Router
    ) { //this.classes =this.coursService.classesList();
    }

  ngOnInit(){
    this.coursService.classesList().subscribe(c => {this.classes = c; })
    this.coursService.editCours(this.activateRoute.snapshot.params['id']).subscribe(c => {
      this.currentCours = c;
      this.newClassId = this.currentCours.classe?.classId!;

    })
  }

  updateCours(){
    this.currentCours.lastUpdatedDate = new Date();

    this.currentCours.classe = this.classes.find(c => c.classId == this.newClassId);
    this.coursService.updateCours(this.currentCours).subscribe(c => {
      this.router.navigate(['cours-list']);
    })
   
  }
}
