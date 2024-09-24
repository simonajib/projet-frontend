import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserModel } from '../../../models/user.model';
import { TeacherModel } from '../../../models/teacher.model';
import { TutorModel } from '../../../models/tutor.model';
import { AdministratorModel } from '../../../models/administrator.model';
import { UserService } from '../../../services/user/users.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,NgxPaginationModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: UserModel[] = [];
  teachers: TeacherModel[] = [];
  tutors: TutorModel[] = [];
  administrators: AdministratorModel[] = [];
  filteredUsers: UserModel[] = [];
  filteredTeachers: TeacherModel[] = [];
  filteredTutors: TutorModel[] = [];
  filteredAdministrators: AdministratorModel[] = [];
  searchQuery: string = '';
  roleFilter: string = 'All'; // Can be 'All', 'Administrator', 'Teacher', 'Tutor'
  p: number = 1; // Page number for pagination

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;  // Initially filtered list is the full list
        this.filterUsers();
      },
      error: (err) => console.error('Error loading users', err)
    });

    this.userService.TeacherList().subscribe({
      next: (data) => {
        this.teachers = data;
        this.filteredTeachers = data;  // Initially filtered list is the full list
      },
      error: (err) => console.error('Error loading teachers', err)
    });

    this.userService.TutorList().subscribe({
      next: (data) => {
        this.tutors = data;
        this.filteredTutors = data;  // Initially filtered list is the full list
      },
      error: (err) => console.error('Error loading tutors', err)
    });

    this.userService.AdministratorList().subscribe({
      next: (data) => {
        this.administrators = data;
        this.filteredAdministrators = data;  // Initially filtered list is the full list
      },
      error: (err) => console.error('Error loading administrators', err)
    });
  }

  onSearchChange(query: string): void {
    this.searchQuery = query.toLowerCase();
    this.filterUsers();
  }

  filterUsers(): void {
    if (this.roleFilter === 'All') {
      this.filteredUsers = this.users.filter(user =>
        (user.role !== 'STUDENT' && user.role !== 'PARENT') &&  // Exclude STUDENT and PARENT
        (user.name?.toLowerCase().includes(this.searchQuery) ||
          user.email?.toLowerCase().includes(this.searchQuery))
      );
    } else if (this.roleFilter === 'Teacher') {
      this.filteredUsers = this.teachers.filter(teacher =>
        teacher.name?.toLowerCase().includes(this.searchQuery) ||
        teacher.email?.toLowerCase().includes(this.searchQuery)
      );
    } else if (this.roleFilter === 'Tutor') {
      this.filteredUsers = this.tutors.filter(tutor =>
        tutor.name?.toLowerCase().includes(this.searchQuery) ||
        tutor.email?.toLowerCase().includes(this.searchQuery)
      );
    } else if (this.roleFilter === 'Administrator') {
      this.filteredUsers = this.administrators.filter(admin =>
        admin.name?.toLowerCase().includes(this.searchQuery) ||
        admin.email?.toLowerCase().includes(this.searchQuery)
      );
    }
  }

  onRoleChange(role: string): void {
    this.roleFilter = role;
    this.filterUsers();  // Apply filtering based on role change
  }

  deleteUser(user: UserModel): void {
    if (user.role === 'TEACHER') {
      this.userService.deleteTeacher(user.userId!).subscribe(() => this.loadUsers());
    } else if (user.role === 'TUTOR') {
      this.userService.deleteTutor(user.userId!).subscribe(() => this.loadUsers());
    } else if (user.role === 'ADMINISTRATOR') {
      this.userService.deleteAdministrator(user.userId!).subscribe(() => this.loadUsers());
    }
  }
}
