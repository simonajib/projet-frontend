import { Component, OnInit } from '@angular/core';
import { ClassModel } from '../../models/class.model';
import { ClassService } from '../../services/class/class.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TeacherModel } from '../../models/teacher.model';
import { CommonModule } from '@angular/common';
import { GradeLevelModel } from '../../models/gradelevel.models';
import { GradelevelService } from '../../services/gradelevel/gradelevel.service';

@Component({
  selector: 'app-edit-class',
  standalone: true,
  imports:  [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-class.component.html',
  styleUrl: './edit-class.component.css'
})
export class EditClassComponent implements OnInit{
currentClass = new ClassModel();
teachers! : TeacherModel[];
newTeacher!: TeacherModel;
newTeacherId! : number;
gradelevels! : GradeLevelModel[];
newGradelevel! : GradeLevelModel;
newGradelevelId? : number;
constructor( 
  private classService : ClassService,
  private activateRoute : ActivatedRoute,
  private router : Router ,private gradelevelService : GradelevelService
){}

ngOnInit() {
    //console.log(this.activateRoute.snapshot.params['id']);
    this.gradelevelService.getAllGradeLevels().subscribe(g =>{this.gradelevels = g;})
    this.classService.teacherList().subscribe(t => {this.teachers = t;})
   this.classService.editClass(this.activateRoute.snapshot.params['id']).subscribe(c => {this.currentClass = c;
    this.newTeacherId = this.currentClass.teacher?.userId!;
   })
}
updateClass(){
  this.currentClass.gradeLevel = this.gradelevels.find(g => g.gradeLevelId == this.newGradelevelId);
  this.currentClass.teacher = this.teachers.find(t => t.userId == this.newTeacherId);
  this.classService.updateClass(this.currentClass).subscribe(c => {
    this.router.navigate(['class-list'])
  })
}
}
