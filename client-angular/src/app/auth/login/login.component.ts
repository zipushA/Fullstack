// import { Component, type OnInit } from "@angular/core"
// import {  FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
// import  { Router, ActivatedRoute, RouterModule } from "@angular/router"

// import { finalize } from "rxjs/operators"
// import { AuthService } from "../../services/auth.service"
// import { MatButtonModule } from "@angular/material/button"
// import { MatCardModule } from "@angular/material/card"
// import { MatFormFieldModule } from "@angular/material/form-field"
// import { MatIconModule } from "@angular/material/icon"
// import { MatInputModule } from "@angular/material/input"
// import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"

// @Component({
//   selector: "app-login",
//   templateUrl: "./login.component.html",
//   standalone: true,
//   imports: [
//     ReactiveFormsModule,
//     RouterModule,
//     MatCardModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatIconModule,
//     MatButtonModule,
//     MatProgressSpinnerModule
//   ],
//   styleUrls: ["./login.component.css"],
// })
// export class LoginComponent implements OnInit {
//   loginForm!: FormGroup
//   loading = false
//   submitted = false
//   returnUrl = "/dashboard"
//   error = ""
//   hide = true

//   constructor(
//     private formBuilder: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router,
//     private authService: AuthService,
//   ) {
//     // redirect to home if already logged in
//     if (this.authService.isLoggedIn()) {
//       this.router.navigate(["/"])
//     }
//   }

//   ngOnInit(): void {
//     this.loginForm = this.formBuilder.group({
//       email: ["", [Validators.required, Validators.email]],
//       password: ["", Validators.required],
//     })

//     // get return url from route parameters or default to '/'
//     this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/dashboard"
//   }

//   // convenience getter for easy access to form fields
//   get f() {
//     return this.loginForm.controls
//   }

//   onSubmit(): void {
//     this.submitted = true

//     // stop here if form is invalid
//     if (this.loginForm.invalid) {
//       return
//     }

//     this.loading = true
//     this.authService
//       .login({
//         email: this.f["email"].value,
//         password: this.f["password"].value,
//       })
//       .pipe(finalize(() => (this.loading = false)))
//       .subscribe({
//         next: () => {
//           this.router.navigate([this.returnUrl])
//         },
//         error: (error: string) => {
//           this.error = error
//         },
//       })
//   }
// }
import { Component, type OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, ActivatedRoute, RouterModule } from "@angular/router";
import { finalize } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl = "/dashboard";
  error = "";
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/dashboard";
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .login({
        email: this.f["email"].value,
        password: this.f["password"].value,
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          // ✅ הדפסת הטוקן לקונסול
          console.log("🔐 Token:", res.token);
          this.router.navigate([this.returnUrl]);
        },
        error: (error: string) => {
          this.error = error;
        },
      });
  }
}
