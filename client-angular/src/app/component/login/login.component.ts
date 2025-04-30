import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [ MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  registerForm: FormGroup;
  show = true;
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      user: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }),
    });
  }

  showpasword() {
    this.show = !this.show;
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    if (this.registerForm.value.user.email === "zh6737478@gmail.com" && 
        this.registerForm.value.user.password === "0556737478za"){ 
        alert("הי ציפוש")
      }
      else{
        alert("you cant login aplication")   
     }
  }
 
}}
