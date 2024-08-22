import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginInProgress = false;
  credentials = { username: '', password: '' };
  message: string | undefined;
  errorMessage: string | undefined;
  showErrorMessage: boolean = false;
  showPassword: boolean = false;

  constructor(private _snackBar: MatSnackBar,private apiService: AuthService, private router: Router) {}

  login() {
    this.loginInProgress = true; 
    this.apiService.login(this.credentials).subscribe(
     (response: LoginResponse) => {
       if (response.status === 200) {
         // Login success
         this.message = response.message; 
           localStorage.setItem('access', response.access);  
           // Redirect to the home page

           this.router.navigate(['dossier']);

//         this.router.navigate(['']);
  }
       else
       {
         this.message = response.message;
         this.showErrorMessage = true;
         if (this.message) {
          //  this.showErrorAlert(this.message.slice(33, 56));
         }
       }
     },
     (error) => {
       // Login error
       this.message = 'Informations invalides';
     }
   ).add(() => {
     this.loginInProgress = false; // Set to false after login completes (whether success or error)
   });
 }

 togglePasswordVisibility(inputField: HTMLInputElement): void {
  const type = inputField.type;
  inputField.type = type === 'password' ? 'text' : 'password';
  this.showPassword = !this.showPassword;
}

}
