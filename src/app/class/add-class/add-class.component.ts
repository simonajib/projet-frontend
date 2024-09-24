import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormsModule } from '@angular/forms';
import { ClassService } from '../../services/class/class.service';
import { ClassModel } from '../../models/class.model';
import { Router, RouterModule } from '@angular/router';
import { TeacherModel } from '../../models/teacher.model';
import { GradeLevelModel } from '../../models/gradelevel.models';
import { GradelevelService } from '../../services/gradelevel/gradelevel.service';

@Component({
  selector: 'app-add-class',
  standalone: true,  // If using standalone components
  imports: [CommonModule, FormsModule,RouterModule ],  // Include CommonModule and FormsModule
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent {
  newClass : ClassModel = new ClassModel();
  teachers! : TeacherModel[];
  newTeacher! : TeacherModel;
  newTeacherId? : number;
  gradelevels! : GradeLevelModel[];
  newGradelevel! : GradeLevelModel;
  newGradelevelId? : number;
  constructor(private classService : ClassService, private router : Router, private gradelevelService : GradelevelService){
    gradelevelService.getAllGradeLevels().subscribe(g=>{this.gradelevels =g;})
  classService.teacherList().subscribe(t => {this.teachers = t;})
  }
  addClass(){
    this.newClass.gradeLevel =this.gradelevels.find(g => g.gradeLevelId == this.newGradelevelId)
    this.newClass.teacher = this.teachers.find(t =>t.userId == this.newTeacherId)
    this.classService.addClass(this.newClass).subscribe(c=>{this.router.navigate(['class-list'])});
  }
}