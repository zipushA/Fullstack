import { Component } from '@angular/core';
import { teacher } from '../../models/teacher';
import { UsersService } from '../../services/users.service';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list'; 
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-show-users',
  standalone: true,
  imports: [MatButtonModule,MatListModule,MatIconModule],
  templateUrl: './show-users.component.html',
  styleUrl: './show-users.component.css'
})
export class ShowUsersComponent {
  users:teacher[] = [];

  constructor(private usersService:UsersService){}
 GetUsers() {
    this.usersService.getAllUser().subscribe(
      (data) => {
    console.log(data)
        this.users = data; // שמירת המידע במערך
      },
      (error) => {
        console.error('Error fetching users', error); // טיפול בשגיאות
      }
    );
  }
  Delete(id:number|undefined,user:string){
    this.usersService.delete(id,user).subscribe(
      (response) => {
        console.log('Course deleted successfully', response);
       
        this.users = this.users.filter(user => user.id !== id);
        }
      ,
      (error) => {
        console.error('Error fetching users', error); // טיפול בשגיאות
      }
    );
  }
}
