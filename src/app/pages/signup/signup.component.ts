import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/AuthService/auth.service';
import { NgClass, NgIf } from '@angular/common';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  registerForm: FormGroup;
  name: FormControl<string | null> = new FormControl<string>('', [Validators.required]);
  age: FormControl<number | null> = new FormControl<number | null>(null, [Validators.required, Validators.min(10)]);
  email: FormControl<string | null> = new FormControl<string>('', [Validators.required, Validators.email]);
  password: FormControl<string | null> = new FormControl<string>('', [Validators.required, Validators.minLength(6)]);
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      email: this.email,
      password: this.password,
    });
  }

  register(): void {
    this.isLoading = true;
    const { name, age, email, password } = this.registerForm.value;
    this.authService.register({name, age, email, password}).subscribe({
      next: (res: any) => {
        console.log('Registration successful:', res);
        this.isLoading = false;
        alert("You have successfully created account");
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.log('Registration error:', err);
        this.isLoading = false;
        this.errorMessage = err.error?.message;
      }
    });
  }
}
