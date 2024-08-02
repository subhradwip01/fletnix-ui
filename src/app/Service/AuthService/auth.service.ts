// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, catchError, of } from 'rxjs';
import { API_CONFIG } from '../../configs/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${API_CONFIG.baseUrl}/auth`;
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private nameSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    this.tokenSubject.next(token);
    this.nameSubject.next(name);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/login', { email, password });
  }

  register(email: string, password: string, age: number, name: string) {
    return this.http.post<User>(this.apiUrl + '/register', {
      email,
      password,
      age,
      name,
    });
  }

  setData(token: string, name: string): void {
    this.tokenSubject.next(token);
    this.nameSubject.next(name);
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
  }

  logout(): void {
    this.tokenSubject.next(null);
    this.nameSubject.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getUsername(): Observable<string | null> {
    return this.nameSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return !!this.tokenSubject.value;
  }
}
