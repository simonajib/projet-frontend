import {Component, OnInit} from '@angular/core';
import {StudentModel} from "../../../models/student.model";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import { UserService } from '../../../services/user/users.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [FormsModule, NgForOf,RouterLink,NgxPaginationModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit{
  students! : StudentModel [];
  filterStudents! : StudentModel[];
  searchQuery:string ='';
  p: number = 1; // For pagination, initialize to page 1


constructor(private userService : UserService) {
}
ngOnInit(){
  this.loadStudent();
}
loadStudent() {
  this.userService.getAllStudent().subscribe({
    next: (s) => {
      this.students = s;
      this.filterStudents = s;
    },
    error: (err) => {
      console.error('Error loading Student:', err);
    }
  });
}
  searchStudents(){
    const query = this.searchQuery.toLowerCase();
    this.filterStudents = this.students.filter(s =>(s.name?.toLowerCase().includes(query) || s.parent?.name?.toLowerCase().includes(query)));
  }

}
