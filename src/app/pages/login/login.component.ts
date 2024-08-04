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
import { Title } from '@angular/platform-browser';
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
  isPasswordShow = false;
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private titleService: Title
  ) {

    this.titleService.setTitle('Login - Login to Fletnix');
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }
  togglePasswordShow () {
    this.isPasswordShow = !this.isPasswordShow
  }
  login(): void {
    this.isLoading = true;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    console.log(this.loginForm.valid, email.valid);
    this.authService.login(email, password).subscribe({
      next: (res: LoginRes) => {
        console.log('success', res);
        this.isLoading = false;
        this.authService.setData(res.data.token, res.data.name);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.log(err);
        this.errorMessage =
          err.error?.message || 'Unable to login now. Please try again later.';
        this.isLoading = false;
      },
    });
  }
}
