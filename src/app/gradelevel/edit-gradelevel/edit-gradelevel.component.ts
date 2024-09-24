import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GradeLevelModel } from '../../models/gradelevel.models';
import { GradelevelService } from '../../services/gradelevel/gradelevel.service';

@Component({
  selector: 'app-edit-gradelevel',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-gradelevel.component.html',
  styleUrl: './edit-gradelevel.component.css'
})
export class EditGradelevelComponent implements OnInit{
currentGradeLevel = new GradeLevelModel();

constructor( private gradelevelService : GradelevelService,private activateRoute : ActivatedRoute, private router : Router ){}
ngOnInit(){
  this.gradelevelService.getGradeLevelById(this.activateRoute.snapshot.params['id']).subscribe(g => {this.currentGradeLevel = g;})
}
updateGradeLevel(){
  this.gradelevelService.updateGradeLevel(this.currentGradeLevel).subscribe(g => {
    this.router.navigate(['grade-level-list'])
  })
}
}
