// src/app/services/movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { API_CONFIG } from '../../configs/apiConfig'; // Make sure this path is correct
import { AuthService } from '../AuthService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  private apiUrl = `${API_CONFIG.baseUrl}/shows`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getShows(type: string | null, page: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // URL encoding for spaces in the type parameter
    const encodedPage = encodeURIComponent(page);
    let query = `page=${encodedPage}`;
    if (type) {
      const encodedType = encodeURIComponent(type);
      query += `&type=${encodedType}`;
    }

    return this.http.get<any>(`${this.apiUrl}?${query}`, { headers });
  }

  getShowDetails(id: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiUrl}/get-details/${id}`, {
      headers,
    });
  }
}
