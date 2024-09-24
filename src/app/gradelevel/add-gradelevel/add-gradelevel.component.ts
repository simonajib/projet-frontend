import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GradeLevelModel } from '../../models/gradelevel.models';
import { GradelevelService } from '../../services/gradelevel/gradelevel.service';

@Component({
  selector: 'app-add-gradelevel',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './add-gradelevel.component.html',
  styleUrl: './add-gradelevel.component.css'
})
export class AddGradelevelComponent {
newGradeLevel : GradeLevelModel = new GradeLevelModel();
constructor(private gradelevelService : GradelevelService, private router : Router){}
addGradeLevel(){
  this.gradelevelService.createGradeLevel(this.newGradeLevel).subscribe(g=>{this.router.navigate(['grade-level-list'])})
}
}
