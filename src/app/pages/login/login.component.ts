import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/AuthService/auth.service';
import { NgClass, NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  email: FormControl<string | null> = new FormControl<string>('');
  password: FormControl<string | null> = new FormControl<string>('');
  isLoading = false;
  errorMessage: string | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }
  login(): void {
    this.isLoading = true;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    console.log(this.loginForm.valid, email.valid);
    this.authService.login(email, password).subscribe({
      next: (res: any) => {
        console.log('success', res);
        this.isLoading = false;
        this.authService.setData(res.data.token, res.data.name);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.log(err);
        alert(err.error.message);
        this.isLoading = false;
      },
    });
  }
}
