import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/auth/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  isLoading = false;
  errorMessage = '';

  constructor(private auth: Auth, private router: Router) {}

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { username, password } = this.loginForm.value;

    this.auth.login(username!, password!).subscribe({
      next: (res) => {
        this.isLoading = false;
        // Navigate to inbox with first appId — adjust as needed
        this.router.navigate(['/feature', 1, 'inbox']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.detail || 'Invalid username or password';
      },
    });
  }
}